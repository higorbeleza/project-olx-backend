require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');

mongoose.connect(process.env.DATA_BASE, {
   useNewUrlParser: true,
   useUnifiedTopology: true 
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
    console.log('Error: ', error.message);
});

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(fileupload());

server.use(express.static(__dirname+'/public'));

server.get('/ping', (req, res) => {
    res.json({pong: true});
});

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.BASE}`);
});