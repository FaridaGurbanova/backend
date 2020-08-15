// Public Modules
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const app = express();

app.use(cors());

app.use(bodyParser.json({limit: '256mb'}));
app.use(bodyParser.urlencoded({extended: false, limit: '256mb'}));
app.use(cookieParser());
app.use(express.static(__dirname));


app.use('/api', require('./routes/ContactRoute'));

app.listen(3001, () => {
    console.log('Server Started Running');
})