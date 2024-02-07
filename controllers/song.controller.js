const catchAsync = require("../utils/catchAsync");
const Song = require("../models/song.model");

const getSongs = catchAsync(async (req, res) => {
  try {
    const songs = await Song.find().populate([
      {
        path: "album",
        select: "title",
        populate: {
          path: "artist",
          select: "name",
        },
      },
      "genre",
    ]);
    res.status(200).json({ songs });
  } catch (error) {
    res.status(400).json({ error });
  }
});

const getSong = catchAsync(async (req, res) => {
  try {
    const song = Song.findById(req.params.id).populate([
      {
        path: "album",
        select: "title",
        populate: {
          path: "artist",
          select: "name",
        },
      },
      "genre",
    ]);
    res.status(200).json({ song });
  } catch (error) {
    res.status(400).json({ error });
  }
});

const createSong = catchAsync(async (req, res) => {
  try {
    const song = await Song.create(req.body);
    const songPopulated = await song.populate([
      {
        path: "album",
        select: "title",
        populate: {
          path: "artist",
          select: "name",
        },
      },
      "genre",
    ]);

    res.status(201).json({ song: songPopulated });
  } catch (error) {
    res.status(400).json({ error });
  }
});

const updateSong = catchAsync(async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate([
      {
        path: "album",
        select: "title",
        populate: {
          path: "artist",
          select: "name",
        },
      },
      "genre",
    ]);
    res.status(200).json({ song });
  } catch (error) {
    res.status(400).json({ error });
  }
});

const deleteSong = catchAsync(async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    res.status(400).json({ error });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Song:
 *       type: object
 *       required:
 *         - title
 *         - album
 *         - genre
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the song
 *           readOnly: true
 *         title:
 *           type: string
 *           description: The title of the song
 *         album:
 *           type: string
 *           description: The album of the song
 *         genre:
 *           type: string
 *           description: The genre of the song
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
 *   name: Songs
 *   description: The songs managing API
 * /api/v1/songs:
 *   get:
 *     summary: Lists all the songs
 *     tags: [Songs]
 *     responses:
 *       200:
 *         description: The list of the songs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 *   post:
 *     summary: Create a new song
 *     tags: [Songs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Song'
 *     responses:
 *       200:
 *         description: The created song.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
 *       500:
 *         description: Some server error
 * /api/v1/songs/{id}:
 *   get:
 *     summary: Get the song by id
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The song id
 *     responses:
 *       200:
 *         description: The song response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
 *       404:
 *         description: The song was not found
 *   patch:
 *    summary: Update the song by the id
 *    tags: [Songs]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The song id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Song'
 *    responses:
 *      200:
 *        description: The song was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Song'
 *      404:
 *        description: The song was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the song by id
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The song id
 *
 *     responses:
 *       200:
 *         description: The song was deleted
 *       404:
 *         description: The song was not found
 */

module.exports = {
  createSong,
  getSongs,
  getSong,
  updateSong,
  deleteSong,
};
