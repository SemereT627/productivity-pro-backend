const router = require("express").Router();
const {
  createGenre,
  getGenres,
  getGenre,
  updateGenre,
  deleteGenre,
} = require("../controllers/genre.controller");

router.route("/").get(getGenres).post(createGenre);
router.route("/:id").get(getGenre).patch(updateGenre).delete(deleteGenre);

module.exports = router;
