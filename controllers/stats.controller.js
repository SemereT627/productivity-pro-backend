const catchAsync = require("../utils/catchAsync");
const Song = require("../models/song.model");
const Artist = require("../models/artist.model");
const Album = require("../models/album.model");
const Genre = require("../models/genre.model");

const dashboardStats = catchAsync(async (req, res) => {
  const songs = await Song.countDocuments();
  const artists = await Artist.countDocuments();
  const albums = await Album.countDocuments();
  const genres = await Genre.countDocuments();

  const genreSongs = await Song.aggregate([
    {
      $group: {
        _id: "$genre",
        count: { $sum: 1 },
      },
    },
  ]);
  const genreSongsPopulated = await Genre.populate(genreSongs, { path: "_id" });

  const artistSongs = await Song.aggregate([
    {
      $group: {
        _id: "$album",
        count: { $sum: 1 },
      },
    },
  ]);
  const artistSongsPopulated = await Album.populate(artistSongs, {
    path: "_id",
  });
  const artistAlbums = await Album.aggregate([
    {
      $group: {
        _id: "$artist",
        count: { $sum: 1 },
      },
    },
  ]);
  const artistAlbumsPopulated = await Artist.populate(artistAlbums, {
    path: "_id",
  });

  const artistStats = artistSongsPopulated.map((album) => {
    const artist = artistAlbumsPopulated.find(
      (artist) => artist._id._id.toString() === album._id.artist.toString()
    );
    return {
      artist: artist._id.name,
      //   album: album._id.title,
      songs: album.count,
      albums: artist.count,
    };
  });

  // Number of songs per albums
  const albumSongs = await Song.aggregate([
    {
      $group: {
        _id: "$album",
        count: { $sum: 1 },
      },
    },
  ]);
  const albumSongsPopulated = await Album.populate(albumSongs, {
    path: "_id",
  });

  return res.status(200).json({
    stat: {
      songs,
      artists,
      albums,
      genres,
    },
    genreSongs: genreSongsPopulated,
    artistStats,
    albumSongs: albumSongsPopulated,
  });
});

module.exports = { dashboardStats };
