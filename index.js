var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
//TODO: FIX DB CONNECTION
var db_url = 'mongodb://localhost:27017/opensponsor'
mongoose.connect(db_url,{useMongoClient: true, promiseLibrary: global.Promise });
app.set('view engine','html');
//TODO: SETUP BODY PARSER

var Athlete = mongoose.model('Athlete',{
    first_name : String,
    last_name : String
});
/*var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to db.");
});*/

//ROUTES
app.get('/athletes',function(req,res,next){
	//res.render("index");
  //res.send("Open Sponsorship");
  Athlete.find(function(err, athletes){
    if(err)
      res.send(err);
    else{
      res.json(athletes);
    }
  });
});

app.get('*',function(req,res,next){
  res.sendfile('./views/index.html');
});

app.listen(3000,function(){
  console.log("Server started. Listening on 3000.");
})
