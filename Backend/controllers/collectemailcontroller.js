const catchAsync = require("../utils/catchasync");
const Email = require("./../utils/email");
const { CollectEmail } = require("./../models/collectemail");
module.exports.emailCollect = catchAsync(async function (req, res, next) {
  //3) Send it to user's email

  let user = req.body;
  await CollectEmail.create(req.body);
  await new Email(user, "").sendUserEmail();
  res.status(201).json({
    status: "success",
  });
});
