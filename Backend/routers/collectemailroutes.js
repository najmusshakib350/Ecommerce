const express = require("express");
const { emailCollect } = require("./../controllers/collectemailcontroller");
const router = express.Router();

router.route("/create").post(emailCollect);

module.exports = router;
