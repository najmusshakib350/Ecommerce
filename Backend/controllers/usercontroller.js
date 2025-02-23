//const multer=require('multer');
const multer = require("multer");
const sharp = require("sharp");
const { User } = require("./../models/people");
const catchAsync = require("./../utils/catchasync");
const AppError = require("./../utils/apperror");
const factory = require("./handlerFactory");
const ProductRequest = require("./../models/productRequest");

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
module.exports.uploadUserPhoto = upload.single("photo");

module.exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  return next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

module.exports.getAllUsers = factory.getAll(User);

module.exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  return next();
};

module.exports.updateMe = catchAsync(async (req, res, next) => {
  //1)Create error if user Posts password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates, Please use /updateMyPassword.",
        400
      )
    );
  }
  //2) Filtered out unwanted fields name that are not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email");
  if (req.file) filteredBody.photo = req.file.filename;

  //3)Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
module.exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
});
module.exports.getuser = factory.getOne(User);
module.exports.createUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined Please use/signup instead",
  });
};
//Do not Update Password With this
module.exports.updateUser = factory.updateOne(User);
module.exports.deleteUser = factory.deleteOne(User);
module.exports.productRequest = factory.createOne(ProductRequest);
