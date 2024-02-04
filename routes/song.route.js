const router = require("express").Router();
const {
  createSong,
  getSongs,
  getSong,
  updateSong,
  deleteSong,
} = require("../controllers/song.controller");

router.route("/").get(getSongs).post(createSong);
router.route("/:id").get(getSong).patch(updateSong).delete(deleteSong);

module.exports = router;
