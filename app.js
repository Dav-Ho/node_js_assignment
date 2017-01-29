var express = require('express');
var app = express();
var mongoose = require("mongoose");

var port = 8080;
var User = require("./model/user");

var db = 'mongodb://localhost/user_data';
mongoose.Promise = global.Promise;

mongoose.connect(db);

app.listen(port, function(){
  console.log('app listening on port ' + port);
});

app.get("/",function(req,res){
  res.send("Happy to be here");
});

app.get("/users",function(req,res){
  console.log('getting all users');
  User.find({})
  .exec(function(err, users){
    if(err){
      res.send('error has occured');
    } else {
      console.log(users);
      res.json(users);
      }
  });
});


// User.remove({}, function(err) {
//    console.log('collection removed');
// });

// var david = new User({
//   firstName: "David",
//   lastName: "Ho",
//   joinDate: "01/09/2000",
//   phoneNumber: "832-132-1432"
// });
//
// david.save(function (err, david) {
//   if (err) return console.log(err);
//   console.log(david)
//   console.log("Saved successfully");
// });
//
// var amy = new User({
//   firstName: "Amy",
//   lastName: "Tai",
//   joinDate: "02/10/2010",
//   phoneNumber: "781-231-1232"
// });
//
// amy.save(function (err, amy) {
//   if (err) return console.log(err);
//   console.log(amy);
//   console.log("Saved successfully");
// });
//
//
// User.find(function (err, users) {
//   if (err) return console.error(err);
//   console.log("Here are the users " + users);
// });
//
// console.log(david.firstName);
// console.log(amy.firstName);
