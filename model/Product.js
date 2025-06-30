const mongoose = require('mongoose')
const {Schema} = mongoose

const productSchema = new Schema({
    name: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    desc: {type: String},
    discountPrice: { type: Number, min: [10, 'discout price must be greater than 10'], max: [20000, 'discount price must be samller than 20,000rs'], required: true},
    discount: { type: Number, min: [1, 'discount is invalid'], max: [100, 'discount must be less than 100%'], required: true },
    price: { type: Number, min: [10, 'price must be greater than 10rs'], max: [10000, 'price must be lower than 10,000rs'], required: true },
    imgTag: String,
    rating: { type: String , min: [0, 'rating is wrong'], max: [5, 'rating is wrong'] },
    gender: { type: String, required: true },
    color: String,
    category: { type: String, required: true },
    fit: String,
    sleve: String,
    thumbnail: { type: String, required: true },
    images: { type: [String] },
    tags: { type: [String] },
    bestseller: { type: Boolean, default: false },
    selectedSizes: { type: [String] },
    deleted: { type: Boolean, default: false}
})

const virtual = productSchema.virtual('id')
virtual.get(function() {
    return this._id;
})
productSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) { delete ret._id}
})


exports.Product = mongoose.model('Product', productSchema)