var express = require('express');
var mongoose = require('mongoose');
var promise = require('bluebird');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine','html');
//TODO: SETUP BODY PARSER
var db_url = 'mongodb://admin:1234@localhost:27017/athletes'
mongoose.connect(db_url,{useMongoClient: true, promiseLibrary: global.Promise });
/*var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  //promise.promisifyAll(mongoose);
  console.log("Connected to db.");
});*/

//MODEL
var Athlete = mongoose.model('Athlete',{
    first_name : String,
    last_name : String
});

//ROUTES
app.get('/athletes',function(req,res,next){
	Athlete.find(function(err, athletes){
    if(err){
      res.send(err);
    }else{
      res.json(athletes);
    }
  });
});

app.post('athletes',function(req,res,next){
  
});

app.get('*',function(req,res,next){
  res.sendfile('./views/index.html');
});

app.listen(3000,function(){
  console.log("Server started. Listening on 3000.");
})
