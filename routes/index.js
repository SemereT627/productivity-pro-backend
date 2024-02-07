const { Router } = require("express");
const songRoutes = require("./song.route");
const artistRoutes = require("./artist.route");
const albumRoutes = require("./album.route");
const genreRoutes = require("./genre.route");
const statRoutes = require("./stat.route");

const router = Router();

router.use("/songs", songRoutes);
router.use("/artists", artistRoutes);
router.use("/albums", albumRoutes);
router.use("/genres", genreRoutes);
router.use("/stats", statRoutes);

module.exports = router;
