const request = require('supertest');
const chai = require('chai');
const _ = require('lodash');
const expect = chai.expect;

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
          expect(_.isArray(res.body));
          expect(res.body.length).to.be.gt(0);
        }).end(done);
    });
    it('POST should create a new company');
  });

  describe('/companies/:id', function() {
    it('GET should respond with a company', function(done) {
      request(app)
        .get('/companies')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
    it('POST should create a new company');
    it('PUT should update a new company');
    it('DEL should delete a new company');
  });
});
