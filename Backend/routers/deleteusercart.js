const router = require("express").Router();
const { deleteAllCartItems } = require("../controllers/cartcontroller");
const { protect, restrictTo } = require("../controllers/authController");

router
  .route("/all")
  .delete(protect, restrictTo("user", "admin"), deleteAllCartItems);
module.exports = router;
