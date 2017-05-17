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

  describe('404', function() {
    it('GET should respond with a 404 when requesting an unknown path', function(done) {
      request(app)
        .get('/unknown')
        .set('Accept', 'application/json')
        .expect(404)
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
        score: 0,
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

    it('POST should return an error if posting invalid body', function(done){
      request(app)
        .post('/companies')
        .send([])
        .set('Accept', 'application/json')
        .expect(400)
        .end(done);
    });

    it('POST should return an error if posting empty body', function(done){
      request(app)
        .post('/companies')
        .send({})
        .set('Accept', 'application/json')
        .expect(400)
        .end(done);
    });
  });

  describe('/companies/:id/votes', function() {
    it('POST should increment a score ', function(done){
      const id = companies[0].id;
      const score = companies[0].score;
      request(app)
        .post('/companies/' + id + '/votes/up')
        .send({})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res){
          expect(_.isPlainObject(res.body)).to.be.true;
          expect(res.body.score).to.be.gt(score);
        }).end(done);
    });

    it('POST should decrement a score ', function(done){
      const id = companies[0].id;
      const score = companies[0].score;
      request(app)
        .post('/companies/' + id + '/votes/down')
        .send({})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function(res){
          expect(_.isPlainObject(res.body)).to.be.true;
          expect(res.body.score).to.be.lt(score);
        })
        .end(done);
    });

    it('POST should respond with a 400 if invalid vote is neither up or down', function(done){
      const id = companies[0].id;
      request(app)
        .post('/companies/' + id + '/votes/foo')
        .send({})
        .set('Accept', 'application/json')
        .expect(400)
        .end(done);
    });

    it('POST should respond with a 404 if company does not exist', function(done) {
      request(app)
        .post('/companies/42/votes/up')
        .set('Accept', 'application/json')
        .expect(404)
        .end(done);
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

    it('GET should respond with a 404 if company does not exist', function(done) {
      request(app)
        .get('/companies/' + 42)
        .set('Accept', 'application/json')
        .expect(404)
        .end(done);
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

    it('PUT should respond with a 404 if company does not exist', function(done) {
      request(app)
        .put('/companies/' + 42)
        .send({ name: 'does-not-exist' })
        .set('Accept', 'application/json')
        .expect(404)
        .end(done);
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

    it('DEL should respond with a 404 if company does not exist', function(done) {
      request(app)
        .del('/companies/' + 42)
        .set('Accept', 'application/json')
        .expect(404)
        .end(done);
    });
  });


});
