const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  items: { type: [Schema.Types.Mixed], require: true },
  user: { type: Schema.Types.ObjectId, ref: "User", require: true },
  totalPrice: { type: Number },
  paymentMethod: { type: String },
  status: { type: String , default: 'pending'},
  orderDate: {type: String},
  deliveryDate: {type: String},
});

const virtual = orderSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Order = mongoose.model("Order", orderSchema);
