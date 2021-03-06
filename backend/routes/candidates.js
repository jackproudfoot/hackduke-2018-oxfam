var express = require('express');
var router = express.Router();

var mongoose = require('mongoose')

var db = require('./../modules/firebase.js').db;

router.get('/', function(req, res, next) {
    var Candidate = mongoose.model('Candidate');
    
    Candidate.find({}, function(err, candidates) {
        if (err) return console.error(err);
        
        res.json(candidates)
    })
});

router.get('/:id', function(req, res, next) {
    var Candidate = mongoose.model('Candidate');
    
    
    Candidate.findById(req.params.id, function(err, candidate) {
        if (err) return console.error(err);
        
        res.json(candidate)
    })
});

module.exports = router;
