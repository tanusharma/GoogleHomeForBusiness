var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
  EmployeeID: String,
  Name: String,
  Designation: String,
  Salary: String,
  Experience: String,

});

module.exports = mongoose.model('emps', BookSchema);//searches for collection with plural of 1st arg - book(s)
