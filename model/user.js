var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({

  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  phoneNumber: {
    type: String
  },
}, {strict: true});

module.exports = mongoose.model('User', UserSchema);
