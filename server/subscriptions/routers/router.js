const express = require("express");
const data = require("../BLs/getDBData");
const router = express.Router();
const movieAPIData = require("../DALs/getMovies");
const mongooseMovieData = require("../configs/moviesSchema");
const mongooseUsersData = require("../configs/membersDBSchema");
const mongooseSubsData = require("../configs/subscriptionsSchema");


//movies
router.route("/:id").get(async (req, res) => {
  let resp = await data.getDataById(mongooseMovieData, req.params.id);
  res.json(resp);
});

router.route("/").get(async (req, res) => {
  let resp = await data.getData(mongooseMovieData);
  res.json(resp);
});
router.route("/create/movies").post(async (req, res) => {
  let resp = await data.saveData(mongooseMovieData, req.body);
  res.json(resp);
});
router.route("/update/movies/:id").put(async (req, res) => {
  let resp = await data.updateData(mongooseMovieData, req.params.id, req.body);
  res.json(resp);
});
router.route("/delete/movies/:id").delete(async (req, res) => {
  let resp = await data.delData(mongooseMovieData, req.params.id);
  res.json(resp);
});



module.exports = router;
