const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 3001;

const app = express();

app.set('port', PORT);
app.set('view engine', 'ejs');
app.set("views", "./views");

app.use("/public", express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const router = require("./routes/index");
app.use(router);

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', (err) => console.error(err));
db.once('open', () => console.log("DB Connected!"));

// Server Open
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트 연결');
});