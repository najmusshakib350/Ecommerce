const catchasync = require("./../utils/catchasync");
const User = require("./../models/people");
module.exports.Mailtrap = catchasync(async function (req, res, next) {
  // findOut correct user
  const singleUser = await User.find({ rating: { lt: 10 } });

  if (!singleUser) {
    return await next("user is not found!", 404);
  } else if (singleUser) {
    if (User.findOne({ id: 5 })) {
      return await next("user is found", 200);
    }
  }
  // if this block continue with this part then bellow code will be execute
  return res.status(500).json({
    message: "Sorry to say, Internal server error",
    statusCode: 500,
  });
});
