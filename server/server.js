const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path')

const app = express();
console.log(typeof(app))
const port = process.env.PORT || 5002;

app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./src/albumRoutes.js');
app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
