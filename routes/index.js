const { Router } = require("express");
const songRoutes = require("./song.routes");
const artistRoutes = require("./artist.routes");
// const albumRoutes = require("./album.routes");
// const genreRoutes = require("./genre.routes");

const router = Router();

router.use("/songs", songRoutes);
router.use("/artists", artistRoutes);
// router.use("/albums", albumRoutes);
// router.use("/genres", genreRoutes);

module.exports = router;
