const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');

/*
* APP Routes
*/
router.get('/api/albums/', albumController.listAlbums);
router.post('/api/albums/', albumController.insertSingleAlbum); 
router.patch('/api/albums/:id', albumController.updateSingleAlbum); 
router.delete('/api/albums/:id', albumController.deleteSingleAlbum); 

module.exports = router;