const express = require('express');
const _ = require('lodash');
const router = express.Router();

const companies = require('../data/companies.json');
companies.sort((a, b) => {
  return a.name.localeCompare(b.name);
});

// GET companies list
router.get('/', function(req, res) {
  res.status(200).json(companies).end();
});

// POST create a new company
router.post('/', function(req, res) {
  //TODO - NOT IMPLEMENTED
  res.status(501).end();
});

// GET a specific company
router.get('/:id', function(req, res) {
  const index = parseInt(req.params.id, 10);
  if (_.isNumber(index) && index < companies.length){
    return res.status(200).json(companies[index]);
  }
  return res.status(404).end();
});

// PUT update a specific company
router.put('/:id', function(req, res) {
  //TODO - NOT IMPLEMENTED
  res.status(501).end();
});

// DELETE a specific company
router.delete('/:id', function(req, res) {
  //TODO - NOT IMPLEMENTED
  res.status(501).end();
});

module.exports = router;
