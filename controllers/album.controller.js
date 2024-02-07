const catchAsync = require("../utils/catchAsync");
const Album = require("../models/album.model");

const getAlbums = catchAsync(async (req, res) => {
  try {
    const albums = await Album.find().populate("artist");
    res.status(200).json({ albums });
  } catch (error) {
    res.status(400).json({ error });
  }
});

const getAlbum = catchAsync(async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate("artist");
    res.status(200).json({ album });
  } catch (error) {
    res.status(400).json({ error });
  }
});

const createAlbum = catchAsync(async (req, res) => {
  try {
    const album = await Album.create(req.body);
    const albumPopulated = await album.populate("artist");
    res.status(201).json({ album: albumPopulated });
  } catch (error) {
    res.status(400).json({ error });
  }
});

const updateAlbum = catchAsync(async (req, res) => {
  try {
    const album = await Album.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("artist");
    res.status(200).json({ album });
  } catch (error) {
    res.status(400).json({ error });
  }
});

const deleteAlbum = catchAsync(async (req, res) => {
  try {
    const albumId = req.params.id;
    await Album.findByIdAndDelete(albumId);
    res
      .status(200)
      .json({ message: "Album deleted successfully", _id: albumId });
  } catch (error) {
    res.status(400).json({ error });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Album:
 *       type: object
 *       required:
 *         - name
 *         - releaseDate
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the album
 *           readOnly: true
 *         name:
 *           type: string
 *           description: The name of the album
 *         artist:
 *           type: string
 *           description: The artist of the album
 *         releaseDate:
 *           type: string
 *           format: date
 *         createdAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 */
/**
 * @swagger
 * tags:
 *   name: Album
 *   description: The albums managing API
 * /api/v1/albums:
 *   get:
 *     summary: Lists all the albums
 *     tags: [Album]
 *     responses:
 *       200:
 *         description: The list of the albums
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Album'
 *   post:
 *     summary: Create a new album
 *     tags: [Album]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Album'
 *     responses:
 *       200:
 *         description: The created album.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Album'
 *       500:
 *         description: Some server error
 * /api/v1/albums/{id}:
 *   get:
 *     summary: Get the album by id
 *     tags: [Album]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The album id
 *     responses:
 *       200:
 *         description: The album response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Album'
 *       404:
 *         description: The album was not found
 *   patch:
 *    summary: Update the album by the id
 *    tags: [Album]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The album id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Album'
 *    responses:
 *      200:
 *        description: The album was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Album'
 *      404:
 *        description: The album was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the album by id
 *     tags: [Album]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The album id
 *
 *     responses:
 *       200:
 *         description: The album was deleted
 *       404:
 *         description: The album was not found
 */

module.exports = {
  getAlbums,
  getAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum,
};
