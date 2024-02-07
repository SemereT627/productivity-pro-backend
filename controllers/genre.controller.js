const catchAsync = require("../utils/catchAsync");
const Genre = require("../models/genre.model");
const Song = require("../models/song.model");

const getGenres = catchAsync(async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json({ genres });
  } catch (error) {
    res.status(400).json({ error });
  }
});

const getGenre = catchAsync(async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    res.status(200).json({ genre });
  } catch (error) {
    res.status(400).json({ error });
  }
});

const createGenre = catchAsync(async (req, res) => {
  try {
    const genre = await Genre.create(req.body);
    res.status(201).json({ genre });
  } catch (error) {
    res.status(400).json({ error });
  }
});

const updateGenre = catchAsync(async (req, res) => {
  try {
    const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ genre });
  } catch (error) {
    res.status(400).json({ error });
  }
});

const deleteGenre = catchAsync(async (req, res) => {
  try {
    const genreId = req.params.id;

    const songs = await Song.find({ genre: genreId });
    if (songs.length > 0) {
      return res
        .status(400)
        .json({ message: "The genre has songs, Delete the songs first." });
    }

    await Genre.findByIdAndDelete(genreId);
    res
      .status(200)
      .json({ message: "Genre deleted successfully", _id: genreId });
  } catch (error) {
    res.status(400).json({ error });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Genre:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the genre
 *           readOnly: true
 *         name:
 *           type: string
 *           description: The name of the genre
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
 *   name: Genre
 *   description: The genres managing API
 * /api/v1/genres:
 *   get:
 *     summary: Lists all the genres
 *     tags: [Genre]
 *     responses:
 *       200:
 *         description: The list of the genres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 *   post:
 *     summary: Create a new genre
 *     tags: [Genre]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *     responses:
 *       200:
 *         description: The created genre.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       500:
 *         description: Some server error
 * /api/v1/genres/{id}:
 *   get:
 *     summary: Get the genre by id
 *     tags: [Genre]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The genre id
 *     responses:
 *       200:
 *         description: The genre response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       404:
 *         description: The genre was not found
 *   patch:
 *    summary: Update the genre by the id
 *    tags: [Genre]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The genre id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Genre'
 *    responses:
 *      200:
 *        description: The genre was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Genre'
 *      404:
 *        description: The genre was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the genre by id
 *     tags: [Genre]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The genre id
 *
 *     responses:
 *       200:
 *         description: The genre was deleted
 *       404:
 *         description: The genre was not found
 */

module.exports = {
  getGenres,
  getGenre,
  createGenre,
  updateGenre,
  deleteGenre,
};
