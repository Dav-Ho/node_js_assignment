var express = require('express');
var app = express();
var mongoose = require("mongoose");
var bodyParser = require('body-parser');


var port = 8080;
var User = require("./model/user");

var db = 'mongodb://localhost/user_data';
mongoose.connect(db);

// User.remove({}, function(err) {
//    console.log('collection removed');
// });

app.use(bodyParser.json());
// allows the use of postman
app.use(bodyParser.urlencoded({
  extended:true
}));

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


app.post('/users',function(req, res){
  var newUser = new User();

  newUser.firstName = req.body.firstName;
  newUser.lastName = req.body.lastName;
  newUser.joinDate = req.body.joinDate;
  newUser.phoneNumber = req.body.phoneNumber;

  newUser.save(function(err, user){
    if(err){
      res.send('error saving user');
    } else {
      console.log(user);
      res.send(user);
    }
  });
});

app.delete('/users/:id',function(req, res){
  User.findOneAndRemove({
    _id: req.params.id
  },function(err, user) {
    if (err){
      res.send("Error deleting");
    } else {
      console.log(user);
      res.status(204);
    }
  });
});

app.get('/months',function(req,res){
  console.log('Here are the users for Jan, Feb, and March');
  User.aggregate([
        {
            $project: {
                month: { $substr: ["$joinDate", 5, 2]}
                //convert to Date and
            }
        }, {
            $group: {
                _id: "$month",
                numberofUsers: {$sum: 1}
            }
        }, {
            $match: {
                _id:{ $lt: "04" } }
        }, {
            $sort: {
                _id: 1
           }
        }
  ], function (err, result) {
    if(err){
      res.send("An error has occured");
    } else {
      res.json(result);  // display the data
    }
  });
});




app.listen(port, function(){
  console.log('app listening on port ' + port);
});
