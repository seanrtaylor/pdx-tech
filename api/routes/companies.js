const express = require('express');
const _ = require('lodash');
const router = express.Router();
const shortId = require('shortid');
//const fs = require('fs');

const jsonFile = '../data/companies.json';

//in memory array of companies
const companies = require(jsonFile);

/*
// generate an id for each company
companies.forEach((company) => {
  company.id = shortId.generate();
  company.notes = '';
});

// sort by ids
companies.sort((a, b) => {
  return a.id.localeCompare(b.id);
});

//write the json back to file
fs.writeFile(__dirname + '/' + jsonFile, JSON.stringify(companies, undefined, 2), 'utf8');
*/


// GET companies list
router.get('/', function(req, res) {
  const sortedCompanies = [].concat(companies);
  //sort by name
  sortedCompanies.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  res.status(200).json(sortedCompanies).end();
});

// POST create a new company
router.post('/', function(req, res) {
  if (!_.isPlainObject(req.body)){
    return res.status(400).end();
  }
  if (_.keys(req.body).length < 1){
    return res.status(400).end();
  }
  const newCompany = _.assign({ name: '', notes: '', url: ''}, req.body);
  newCompany.id = shortId.generate();
  companies.push(newCompany);
  return res.status(200).json({ id: newCompany.id });
});

// GET a specific company
router.get('/:id', function(req, res) {
  const match = _.find(companies, { id: req.params.id });
  if (match){
    return res.status(200).json(match);
  }
  return res.status(404).end();
});

// PUT update a specific company
router.put('/:id', function(req, res) {
  const match = _.find(companies, { id: req.params.id });
  if (match){

    //Update the match in memory
    //NOTE: these aren't persisted to disk
    ['name', 'notes', 'url'].forEach( (key) => {
      if (key in req.body){
        match[key] = req.body[key];
      }
    });

    return res.status(200).end();
  }
  return res.status(404).end();
});

// DELETE a specific company
router.delete('/:id', function(req, res) {
  const index = _.findIndex(companies, { id: req.params.id });
  if (index > -1){
    companies.splice(index);
    return res.status(200).json({ id: req.params.id });
  }
  return res.status(404).end();
});

module.exports = router;
