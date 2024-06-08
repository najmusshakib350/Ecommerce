const express = require("express");
const {
  createProduct,
  allProducts,
  findOneProduct,
  deleteProduct,
  updateProduct,
  uploadProductImages,
  resizeProductImages,
  productRequest,
} = require("./../controllers/productcontroller");
const { protect, restrictTo } = require("../controllers/authController");
const router = express.Router();

router.route("/").get(allProducts);
router.route("/request").get(protect, restrictTo("admin"), productRequest);
router.route("/:id").get(findOneProduct);

router.route("/:id").delete(protect, restrictTo("admin"), deleteProduct);

router.route("/:id").patch(updateProduct);
router
  .route("/create")
  .post(
    protect,
    restrictTo("admin"),
    uploadProductImages,
    resizeProductImages,
    createProduct
  );

module.exports = router;
