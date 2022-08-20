require('../models/db');
const Album = require('./Album');


/**
* /api/albums/ 
* GET All Albums
*/
exports.listAlbums = async(req, res) => {
  let { limit = 10, page = 1, category, q } = req.query;

  const limitRecords = parseInt(limit);
  const skip = (page -1) * limit;

  let query = {};
  if(q) {
    query = {$text: {$search: q}};
  }
  if(category) query.category = category;
 

  try {
    // const albums = await Album.find({})
    const albums = await Album.find(query).limit(limitRecords).skip(skip);
    // res.json({albums});
    res.json({ page: page, limit:limitRecords, albums});
  } catch (err) {
    res.status(400).json( {message: err })
  } 
}


/**
* /api/albums/ 
* POST Single Album
*/
exports.insertSingleAlbum = async(req, res) => {

  const newAlbum = new Album({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    thumbnail: req.body.thumbnail 
  });

  try {
    await newAlbum.save();
    res.json(newAlbum);
  } catch (err) {
    res.status(400).json( { message: err })
  }
}



/**
* /api/albums/:id
* PATCH Single Album
*/
exports.updateSingleAlbum = async(req, res) => {
  let paramID = req.params.id;
  let name = req.body.name;

  try {
    const updateAlbum = await Album.updateOne({ _id:paramID }, { name:name });
    res.json(updateAlbum);
  } catch (error) {
    res.status(400).json( { message: err })
  }
}



/**
* /api/albums/:id
* DELETE Single Album
*/
exports.deleteSingleAlbum = async(req, res) => {
  let paramID = req.params.id;

  try {
    const data = await Album.deleteOne({ _id:paramID });
    res.json(data);
  } catch (error) {
    res.status(400).json( { message: err })
  }
}