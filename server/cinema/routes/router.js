const express = require("express");
const router = express.Router();
const data = require("../BLs/dataBL");

//users
router.route("/").get(async (req, res) => {
  let resp = await data.getJsonData("/../jsonFiles/users.json");
  res.json(resp);
});

router.route("/create/user").post(async (req, res) => {
  let resp = await data.createDataJson(req.body, "/../jsonFiles/users.json");
  res.json(resp);
});

router.route("/update/user/:id").put(async (req, res) => {
  let resp = await data.updateJsonData(req.body, req.params.id, "/../jsonFiles/users.json");
  res.json(resp);
});
router.route("/delete/user/:id").delete((req, res) => {
  let resp = data.deleteJsonData(req.params.id, "/../jsonFiles/users.json");
  res.json(resp);
});

//permissions
router.route("/permissions").get(async (req, res) => {
  let resp = await data.getJsonData("/../jsonFiles/permissions.json");
  res.json(resp);
});
router.route("/create/permissions").post(async (req, res) => {
  let resp = await data.createDataJson(req.body, "/../jsonFiles/permissions.json");
  res.json(resp);
});
router.route("/update/permissions/:id").put(async (req, res) => {
  let resp = await data.updateJsonData(req.body, req.params.id, "/../jsonFiles/permissions.json");
  res.json(resp);
});
router.route("/delete/permissions/:id").delete((req, res) => {
  let resp = data.deleteJsonData(req.params.id, "/../jsonFiles/permissions.json");
  res.json(resp);
});

//create edit update del db user


router.route("/db").get(async (req, res) => {
  let resp = await data.getData();
  res.json(resp);
});
router.route("/db/create").post(async (req, res) => {
  let resp = await data.saveData(req.body);
  res.json(resp);
});
router.route("/db/update/:id").put(async (req, res) => {
  let resp = await data.updateData(req.params.id, req.body);
  res.json(resp);
});
router.route("/db/delete/:id").delete(async (req, res) => {
  let resp = await data.delData(req.params.id);
  res.json(resp);
});
router.route("/:id").get(async (req, res) => {
  let resp = await data.getDataById(req.params.id);
  res.json(resp);
});

module.exports = router;
