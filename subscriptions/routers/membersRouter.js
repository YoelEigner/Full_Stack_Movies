const express = require("express");
const data = require("../BLs/getDBData");
const router = express.Router();
const movieAPIData = require("../DALs/getMovies");
const mongooseUsersData = require("../configs/membersDBSchema");


//members
router.route("/:id").get(async (req, res) => {
  let resp = await data.getDataById(mongooseUsersData, req.params.id);
  res.json(resp);
});

router.route("/").get(async (req, res) => {
  let resp = await data.getData(mongooseUsersData);
  res.json(resp);
});
router.route("/create/members").post(async (req, res) => {
  let resp = await data.saveData(mongooseUsersData, req.body);
  res.json(resp);
});
router.route("/update/members/:id").put(async (req, res) => {
  let resp = await data.updateData(mongooseUsersData, req.params.id, req.body);
  res.json(resp);
});
router.route("/delete/members/:id").delete(async (req, res) => {
  let resp = await data.delData(mongooseUsersData, req.params.id);
  res.json(resp);
});

module.exports = router;
