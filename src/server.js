require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');

const apiRoutes = require('./routes');

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

server.use('/', apiRoutes);

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.BASE}`);
});