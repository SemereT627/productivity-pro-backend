const router = require("express").Router();
const {
  createAlbum,
  getAlbums,
  getAlbum,
  updateAlbum,
  deleteAlbum,
} = require("../controllers/album.controller");

router.route("/").get(getAlbums).post(createAlbum);
router.route("/:id").get(getAlbum).patch(updateAlbum).delete(deleteAlbum);

module.exports = router;
