require("dotenv").config();
const express = require("express");
const path = require("path");
const server = express();
const mongoose = require("mongoose");
const { createProduct } = require("./controller/Prduct");
const productRouter = require("./routes/Product");
const userRouter = require("./routes/User");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const orderRouter = require("./routes/Order");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const { User } = require("./model/Users");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const secretKey = process.env.SESSION_KEY;
const cookieParser = require("cookie-parser");

//web hook visit this website --> https://dashboard.stripe.com/test/webhooks/create to see how to check a webhook

const endpointSecret = process.env.WEBHOOK_kEY;

server.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;
        console.log({ paymentIntentSucceeded });
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

//jwt
const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = secretKey;

//session
server.use(express.static(path.join(__dirname, "dist")));

server.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport and sessions
server.use(cookieParser());
server.use(passport.initialize());
server.use(passport.session());

// Passport Local Strategy
passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      // Find user in the database
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }

        crypto.pbkdf2(
          password,
          user.salt,
          31000,
          32,
          "sha256",
          async function (err, derivedKey) {
            if (err) return done(err);

            // Compare hashed password using timingSafeEqual
            if (
              crypto.timingSafeEqual(
                Buffer.from(user.password, "hex"),
                derivedKey
              )
            ) {
              var token = jwt.sign({ id: user.id, role: user.role }, secretKey);
              return done(null, { id: user.id, role: user.role, token });
            } else {
              return done(null, false, { message: "Incorrect password." });
            }
          }
        );
      } catch (error) {
        return done(error);
      }
    }
  )
);

//jwt strategy

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    // console.log({jwt_payload});
    try {
      const user = await User.findById(jwt_payload.id);

      if (user) {
        return done(null, { id: user.id, role: user.role });
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(err, false);
    }
  })
);

// Passport serialization and deserialization
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  const id = user.id;
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});

server.use(cors());
server.use(express.json());
server.use("/products", productRouter.router);
server.use("/users", isAuth, userRouter.router); //used isAuth to make this routes protected routes
server.use("/auth", authRouter.router);
server.use("/cart", isAuth, cartRouter.router);
server.use("/orders", isAuth, orderRouter.router);

// Payment Intent

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
  return 1400; // stripe takes last 2 digits as decimal points so 1400 means
};

server.post("/create-payment-intent", async (req, res) => {
  const { totalPrice } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalPrice * 100,
    currency: "inr",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

server.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("database connected");
}

server.get("/", (req, res) => {
  res.send({ status: "success" });
});

// use isAuth function to make any route protected route
function isAuth(req, res, next) {
  // return passport.authenticate("jwt") and dont forget to use isAuth()
  passport.authenticate("jwt", (err, user) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  })(req, res, next);
}

server.listen(process.env.PORT, () => {
  console.log("Server Started");
});
