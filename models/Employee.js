var mongoose = require('mongoose');

var EmpSchema = new mongoose.Schema({
  EmployeeID: String,
  Name: String,
  Designation: String,
  Salary: String,
  Experience: String,

});

module.exports = mongoose.model('emps', EmpSchema);//searches for collection with plural of 1st arg - emp(s)
