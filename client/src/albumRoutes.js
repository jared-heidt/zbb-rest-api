const express = require('express')
const albumRouter = express.Router()
const axios = require('axios')
const { ensureAuthenticated } = require('./auth');


albumRouter.get('/', ensureAuthenticated, async(req, res) => {
     try {
         const { data } = await axios.get(`http://localhost:5002/api/albums`)
         let albums = data.albums
        res.render('discography', { movies: albums, user: req.user})
     } catch (err) {
         if(err.response) {
             res.render('discography', { articles : null })
             console.log(err.response.data)
             console.log(err.response.status)
             console.log(err.response.headers)
         } else if(err.request) {
             res.render('discography', { articles : null })
             console.log(err.request)
         } else {
             res.render('discography', { articles : null })
             console.error('Error', err.message)
         }
     } 
 })

albumRouter.get('/:id', ensureAuthenticated, async(req, res) => {
    let articleID = req.params.id
    try {
        const { data } = await axios.get(`http://localhost:5002/api/albums`)
        let album = data.albums.find(album => album.id == articleID)
        res.render('albumSingle', { article: album })
    } catch (err) {
        if(err.response) {
            res.render('albumSingle', { article : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.request) {
            res.render('albumSingle', { article : null })
            console.log(err.request)
        } else {
            res.render('albumSingle', { article : null })
            console.error('Error', err.message)
        }
    } 
})

albumRouter.post('/', async(req, res) => {
    let searchStr = req.body.search
    //let searchStr = req.params.Search
    console.log(searchStr)
    try {
        const { data }  = await axios.get(`http://localhost:5002/api/albums`)
        //Error is here
        const result = data.albums.find( { $text: { $search: searchStr } });
        res.render('discographySearch', { articles : result })
    } catch (err) {
        if(err.response) {
            res.render('discographySearch', { articles : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.requiest) {
            res.render('discographySearch', { articles : null })
            console.log(err.requiest)
        } else {
            res.render('discographySearch', { articles : null })
            console.error('Error', err.message)
        }
    } 
})



module.exports = albumRouter 
