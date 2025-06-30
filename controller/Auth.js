const { User } = require("../model/Users");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../services/mail");
const secretKey = "SECRET_KEY";

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  // old code to save user directly
  // const doc = await user.save();
  // res.status(201).json(doc);
  try {
    const salt = crypto.randomBytes(16).toString("hex");

    crypto.pbkdf2(
      req.body.password,
      salt,
      31000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        if (err) throw err;

        const user = new User({
          ...req.body,
          password: hashedPassword.toString("hex"), // Ensure hashedPassword is also converted to hex
          salt: salt,
        });
        // console.log(user);

        const doc = await user.save();

        req.login({ id: doc.id, role: doc.role }, (err) => {
          if (err) {
            res.status(400).json(err);
          } else {
            var token = jwt.sign({ id: doc.id, role: doc.role }, secretKey);
            res
              .cookie("jwt", token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true,
              })
              .status(201)
              .json({ id: doc.id, role: doc.role });
          }
        });
      }
    );
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.loginUser = async (req, res) => {
  const user = req.user;
  // try {
  //   const user = await User.findOne({ email: req.body.email }).exec();
  //   if (!user) {
  //       res.status(401).json({ message : 'no such user email'})
  //   } else if (user.password === req.body.password) {
  //     res.status(201).json({id: user.id, email: user.email, name: user.name, addresses: user.addresses});
  //   } else {
  //     res.status(401).json({ message: "invalid creadentials" });
  //   }
  // } catch (error) {
  //   res.status(400).json(error);
  // }
  res
    .cookie("jwt", req.user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(201)
    .json({ id: user.id, role: user.role });
};

exports.logout = async (req, res) => {
  res
    .cookie("jwt", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .sendStatus(200);
};

exports.checkAuth = async (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.send(401);
  }
};

exports.resetPasswordRequest = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const token = crypto.randomBytes(48).toString("hex");
    user.resetPasswordToken = token;
    await user.save();

    const email = req.body.email;
    const subject = "reset password";
    const resetPageLink =
      "http://localhost:8000/reset-password?token=" + token + "&email=" + email;
    const html = `<p>Click <a href=${resetPageLink}>here</a> to reset password</p>`;

    if (email) {
      const response = await sendMail({ to: req.body.email, subject, html });
      res.json(response);
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
};

exports.resetPassword = async (req, res) => {
  const { email, password, token } = req.body;

  const user = await User.findOne({ email: email, resetPasswordToken: token });
  if (user) {
    try {
      const salt = crypto.randomBytes(16).toString("hex");

      crypto.pbkdf2(
        password,
        salt,
        31000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (err) throw err;

          user.password = hashedPassword.toString("hex");
          user.salt = salt;
          const doc = await user.save();
          const subject = "password successfully reset for e-commerce";
          const html = `<p>Successfully able to Reset Password</p>`;
          if (email) {
            const response = await sendMail({ to: email, subject, html });
            res.json(response);
          } else {
            res.sendStatus(400);
          }
        }
      );
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.sendStatus(400);
  }
};
