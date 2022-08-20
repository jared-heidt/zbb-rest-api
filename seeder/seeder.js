const fs = require('fs');
const colors = require('colors');
const mongoose = require('mongoose');
const connectDB = require('./src/connect')
require('dotenv').config();

// Load models
const Album = require('./src/Album');

connectDB(process.env.MONGO_URI_LOCAL)

// Read JSON files
const album = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/albums.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Album.create(album);

    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Album.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
