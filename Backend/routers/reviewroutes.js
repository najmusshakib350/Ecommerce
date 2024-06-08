const express = require("express");
const {
  createReview,
  allReviews,
  oneReview,
  updateReview,
  deleteReview,
  oneUserReview,
} = require("./../controllers/reviewcontroller");
const { protect, restrictTo } = require("../controllers/authController");
const router = express.Router();

router.route("/").get(allReviews);
router.route("/user/:id").get(oneUserReview);
router.use(protect);
router.route("/:id").get(oneReview);

router.route(":/id").patch(restrictTo("user", "admin"), updateReview);
router.route(":/id").delete(restrictTo("user", "admin"), deleteReview);
router.route("/create").post(restrictTo("user", "admin"), createReview);

module.exports = router;
