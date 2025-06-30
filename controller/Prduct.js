const { json, query } = require("express");
const { Product } = require("../model/Product");

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchAllProducts = async (req, res) => {
  const queryConditions = {
    deleted: {$ne: true}
  };

  if (req.query.category) {
    queryConditions.category = req.query.category;
  }
  if (req.query.gender) {
    queryConditions.gender = req.query.gender;
  }
  if (req.query.size) {
    queryConditions.size = req.query.size
  }
  if (req.query.color) {
    queryConditions.color = req.query.color
  }
  if (req.query.fit) {
    queryConditions.fit = req.query.fit
  }
  if (req.query.sleve) {
    queryConditions.sleve = req.query.sleve
  }

  try {
    let query = Product.find(queryConditions);

    if (req.query._sort && req.query._order) {
      const sortQuery = { [req.query._sort]: req.query._order };
      query = query.sort(sortQuery);
    }

    const doc = await query.exec();
    const totalDocs = await Product.countDocuments(queryConditions);
    // console.log(totalDocs);
    res.set('X-Total-Count',totalDocs)
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchProductById = async (req, res) => {
  const {id} = req.params;
  try{
    const product = await  Product.findById(id)
    res.status(200).json(product)
  } catch (err) {
    res.status(400).json(err)
  }
}

exports.updateProduct = async (req, res) => {
  const {id} = req.params;
  try{
    const product = await  Product.findByIdAndUpdate(id, req.body, {new: true})
    res.status(200).json(product)
  } catch (err) {
    res.status(400).json(err)
  }
}