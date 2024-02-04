const router = require("express").Router();
const {
  createArtist,
  getArtists,
  getArtist,
  updateArtist,
  deleteArtist,
} = require("../controllers/artist.controller");

router.route("/").get(getArtists).post(createArtist);
router.route("/:id").get(getArtist).patch(updateArtist).delete(deleteArtist);

module.exports = router;
