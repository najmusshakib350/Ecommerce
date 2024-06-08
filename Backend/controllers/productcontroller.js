const Product = require("./../models/product");
const handlerFactory = require("./handlerFactory");
const multer = require("multer");
const sharp = require("sharp");
const catchasync = require("../utils/catchasync");
const ProductRequest = require("./../models/productRequest");
//Product Image upload code start
const multerStorage = multer.memoryStorage();
const multerFilter = function (req, file, cb) {
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
module.exports.uploadProductImages = upload.fields([
  { name: "photo", maxCount: 1 },
  { name: "images", maxCount: 3 },
]);

module.exports.resizeProductImages = catchasync(async function (
  req,
  res,
  next
) {
  if (!req.files.photo && !req.files.images) {
    return next();
  }
  if (!req.params.id) {
    req.params.id = 0;
  }
  //Cover image
  req.body.photo = `product-${req.params.id}-${Date.now()}-cover.jpeg`;

  await sharp(req.files.photo[0].buffer)
    // .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/products/${req.body.photo}`);

  return next();
});
//Product Image upload code end

module.exports.createProduct = handlerFactory.createOne(Product);
module.exports.allProducts = handlerFactory.getAll(Product);
module.exports.findOneProduct = handlerFactory.getOne(Product, {
  path: "reviews",
});
module.exports.updateProduct = handlerFactory.updateOne(Product);
module.exports.deleteProduct = handlerFactory.deleteOne(Product);
module.exports.productRequest = catchasync(async function (req, res, next) {
  const document = await ProductRequest.find({});

  res.status(200).json({
    status: "success",
    data: {
      doc: document,
    },
  });
});
