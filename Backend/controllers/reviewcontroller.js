const Review = require("./../models/review");
const handlerFactory = require("./handlerFactory");
const AppError = require("./../utils/apperror");
const catchasync = require("./../utils/catchasync");

module.exports.oneUserReview = catchasync(async function (req, res, next) {
  let document = await Review.find({ user: req.params.id });
  if (!document) {
    return next(new AppError("No Document found with that Id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      doc: document,
    },
  });
});

module.exports.createReview = handlerFactory.createOne(Review);
module.exports.allReviews = handlerFactory.getAll(Review);
module.exports.oneReview = handlerFactory.getOne(Review);
module.exports.updateReview = handlerFactory.updateOne(Review);
module.exports.deleteReview = handlerFactory.deleteOne(Review);
