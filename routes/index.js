const { Router } = require("express");
const songRoutes = require("./song.routes");

const router = Router();

router.use("/songs", songRoutes);

module.exports = router;
