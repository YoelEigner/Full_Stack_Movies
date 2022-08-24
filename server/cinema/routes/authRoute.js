const express = require("express");
const router = express.Router();
const userData = require("../BLs/dataBL");
const jwt = require("jsonwebtoken");

router.route("/").post(async (req, res) => {
  let resp = await userData.getData();
  // var token = req.headers["x-access-token"];

  let user = resp.find((x) => x.username == req.body.username);
  if (user) {
    if (user.username == req.body.username && user.password == req.body.password) {
      return res.status(200).send({ auth: true, resp });
    } else {
      return res.status(401).send({ auth: false, msg: "Failed to authenticate, please try again" });
    }
  } else {
    return res.status(500).send({ auth: false, msg: "User not found" });
  }
});

module.exports = router;
