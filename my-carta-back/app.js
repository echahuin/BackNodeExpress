const express = require('express');
const morgan = require('morgan');
const path = require('path')
const exphbs = require('express-handlebars')
const { mongoose } = require('./database');
const multer = require('multer');
const cors = require('cors')
require('dotenv').config();

//inicializadores
const app = express();

// Setting

app.set('port', process.env.PORT || 3006)
app.use(express.json());
//middleweare
app.use(cors());

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  }
})

app.use(multer({ storage }).single('image'))

//Routes

app.use('/api/food', require('./routes/typeData-routes'))

//Starting Server

app.listen(app.get('port'), () => {
  console.log(`Example app listening on port ${app.get('port')}`);
});
