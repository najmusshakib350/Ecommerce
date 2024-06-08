const mongoose = require("mongoose");

const productRequestSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productUrl: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductRequest = mongoose.model("ProductRequest", productRequestSchema);
module.exports = ProductRequest;
