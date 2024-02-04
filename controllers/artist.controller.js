const catchAsync = require("../utils/catchAsync");
const Artist = require("../models/artist.model");

const getArtists = catchAsync(async (req, res) => {
  try {
    const artists = await Artist.find();
    res.status(200).json({ artists });
  } catch (error) {
    res.status(400).json({ error });
  }
});

const getArtist = catchAsync(async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    res.status(200).json({ artist });
  } catch (error) {
    res.status(400).json({ error });
  }
});

const createArtist = catchAsync(async (req, res) => {
  try {
    const artist = await Artist.create(req.body);
    res.status(201).json({ artist });
  } catch (error) {
    res.status(400).json({ error });
  }
});

const updateArtist = catchAsync(async (req, res) => {
  try {
    const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ artist });
  } catch (error) {
    res.status(400).json({ error });
  }
});

const deleteArtist = catchAsync(async (req, res) => {
  try {
    await Artist.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Artist deleted successfully" });
  } catch (error) {
    res.status(400).json({ error });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Artist:
 *       type: object
 *       required:
 *         - name
 *         - birthDate
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the artist
 *           readOnly: true
 *         name:
 *           type: string
 *           description: The name of the artist
 *         birthDate:
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
 *   name: Artists
 *   description: The artists managing API
 * /api/v1/artists:
 *   get:
 *     summary: Lists all the artists
 *     tags: [Artists]
 *     responses:
 *       200:
 *         description: The list of the artists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Artist'
 *   post:
 *     summary: Create a new artist
 *     tags: [Artists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Artist'
 *     responses:
 *       200:
 *         description: The created artist.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artist'
 *       500:
 *         description: Some server error
 * /api/v1/artists/{id}:
 *   get:
 *     summary: Get the artist by id
 *     tags: [Artists]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The artist id
 *     responses:
 *       200:
 *         description: The artist response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artist'
 *       404:
 *         description: The artist was not found
 *   patch:
 *    summary: Update the artist by the id
 *    tags: [Artists]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The artist id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Artist'
 *    responses:
 *      200:
 *        description: The artist was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Artist'
 *      404:
 *        description: The artist was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the artist by id
 *     tags: [Artists]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The artist id
 *
 *     responses:
 *       200:
 *         description: The artist was deleted
 *       404:
 *         description: The artist was not found
 */

module.exports = {
  getArtists,
  getArtist,
  createArtist,
  updateArtist,
  deleteArtist,
};
