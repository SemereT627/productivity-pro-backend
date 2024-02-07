const router = require("express").Router();
const { dashboardStats } = require("../controllers/stats.controller");

router.route("/").get(dashboardStats);

module.exports = router;
