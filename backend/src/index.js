const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');

//Server start
const app = express();
app.use(express.json());
app.use(cors());

//MongoDB
mongoose.connect('mongodb://192.168.99.100:27017/productHunt', { useNewUrlParser: true});

//Rotas
const routes = require('./routes.js');
app.use(routes); 
app.listen(3030);