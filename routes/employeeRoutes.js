var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Employee = require('../models/Employee.js');

/* GET ALL EMPLOYEES */
router.get('/', function(req, res, next) {
  Employee.find(req.body, function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET Filtered EMPLOYEES */
router.post('/', function(req, res, next) {
  Employee.find(req.body, function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE EMPLOYEE BY ID */
router.get('/:id', function(req, res, next) {
  Employee.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE EMPLOYEE */
router.post('/save', function(req, res, next) {
  Employee.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE EMPLOYEE */
router.put('/:id', function(req, res, next) {
  Employee.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE EMPLOYEE */
router.delete('/:id', function(req, res, next) {
  Employee.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});



module.exports = router;
