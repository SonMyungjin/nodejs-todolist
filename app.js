const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();


app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set("views", "./views");

app.use("/public", express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const router = require("./routes/index");
app.use(router);

  
mongoose.connect("mongodb://root:1234@localhost:27017/nodejs?authSource=admin", {
    useNewUrlParser: true, useUnifiedTopology: true}, function(err){
    if(err){
        console.error("mongoDB Connection Error!", err);
    }
    console.log("mongoDB Connected!");
    
    // Server Open
    app.listen(app.get('port'), () => {
        console.log(app.get('port'), '번 포트 연결');
    });
});  

