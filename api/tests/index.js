const request = require('supertest');
const chai = require('chai');
const _ = require('lodash');
const expect = chai.expect;
const jsonFile = '../data/companies.json';
const companies = require(jsonFile);

describe('api', function(){
  let app;
  before(function(){
    app = require('../app.js');
  });
  after(function(){
    app.close();
  });

  describe('/', function() {
    it('GET should respond with 200', function(done) {
      request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done);
    });
  });

  describe('/companies', function() {
    it('GET should respond with a list of companies', function(done) {
      request(app)
        .get('/companies')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res){
          expect(_.isArray(res.body)).to.be.true;
          expect(res.body.length).to.be.gt(0);
        }).end(done);
    });

    it('POST should create a new company', function(done){
      const company = {
        name: 'foo',
        notes: '',
        url: 'http://test.com'
      };

      request(app)
        .post('/companies')
        .send(company)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200).then(function(res){
          company.id = res.body.id;
          request(app)
            .get('/companies/' + res.body.id)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res2){
              expect(_.isPlainObject(res2.body)).to.be.true;
              expect(res2.body).to.eql(company);
            }).end(done);
        });

    });

  });

  describe('/companies/:id', function() {
    it('GET should respond with a company', function(done) {
      request(app)
        .get('/companies/' + companies[0].id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res){
          expect(_.isPlainObject(res.body)).to.be.true;
          expect(res.body).to.eql(companies[0]);
        }).end(done);
    });


    it('PUT should update a company', function(done) {
      const company = _.clone(companies[0]);
      company.name = 'foo';

      request(app)
        .put('/companies/' + company.id)
        .send(_.pick(company, 'name'))
        .set('Accept', 'application/json')
        .expect(200).then(function(){
          request(app)
            .get('/companies/' + company.id)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res){
              expect(_.isPlainObject(res.body)).to.be.true;
              expect(res.body).to.eql(company);
            }).end(done);
        });
    });

    it('DEL should delete a new company', function(done){
      const id = companies[0].id;
      request(app)
        .del('/companies/' + id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res){
          expect(_.isPlainObject(res.body)).to.be.true;
          expect(res.body.id).to.eql(id);
        }).end(done);
    });
  });
});
