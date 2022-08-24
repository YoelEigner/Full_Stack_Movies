const express = require("express");
const data = require("../BLs/getDBData");
const router = express.Router();
const movieAPIData = require("../DALs/getMovies");

const mongooseSubsData = require("../configs/subscriptionsSchema");

router.route("/:id").get(async (req, res) => {
  let resp = await data.getDataById(mongooseSubsData, req.params.id);
  res.json(resp);
});

router.route("/").get(async (req, res) => {
  let resp = await data.getData(mongooseSubsData);
  res.json(resp);
});
router.route("/create/subs").post(async (req, res) => {
  let resp = await data.saveData(mongooseSubsData, req.body);
  res.json(resp);
});
router.route("/update/subs/:id").put(async (req, res) => {
  let resp = await data.updateData(mongooseSubsData, req.params.id, req.body);
  res.json(resp);
});
router.route("/delete/subs/:id").delete(async (req, res) => {
  let resp = await data.delData(mongooseSubsData, req.params.id);
  res.json(resp);
});

module.exports = router;
