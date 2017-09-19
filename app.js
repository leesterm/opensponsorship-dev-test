var express = require('express');
var mongoose = require('mongoose');
var promise = require('bluebird');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('public'));  //include scripts/js files
app.set('view engine','html');

//TODO: SETUP BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var db_url = 'mongodb://localhost:27017/athletes'
mongoose.connect(db_url,{useMongoClient: true, promiseLibrary: global.Promise });
/*var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  //promise.promisifyAll(mongoose);
  console.log("Connected to db.");
});*/

//MODEL
var athleteSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  dob : Date,
  nationality: String,
  association: String,
  team: String,
  gender: String,
  sports: Array,
  about: String,
  interests: String,
  charitites: String,
  social_media: String,
  pets: String,
  drinks_alcohol: Boolean,
  married : Boolean
})
var Athlete = mongoose.model('Athlete',athleteSchema);

function getAthletes(res){
  Athlete.find(function(err, athletes){
    if(err){
      res.send(err);
    }else{
      res.json(athletes);
    }
  });
};
//ROUTES
app.get('/athletes',function(req,res,next){
	getAthletes(res);
});

app.post('/athletes',function(req,res,next){
  console.log(req);
  Athlete.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    dob : req.body.dob,
    nationality: req.body.nationality,
    association: req.body.association,
    team: req.body.team,
    gender: req.body.gender,
    sports: req.body.sports,
    about: req.body.about,
    interests: req.body.interests,
    charitites: req.body.charitites,
    social_media: req.body.social_media,
    pets: req.body.pets,
    drinks_alcohol: req.body.drinks_alcohol,
    married : req.body.married
  },function(err,athlete){
    if(err) res.send(err);
    else {
      getAthletes(res);
    }
  });
});

app.get('/',function(req,res,next){
  res.sendfile('public/views/index.html');
});

app.listen(3000,function(){
  console.log("Server started. Listening on 3000.");
})
