import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../index';
import { User, Question } from '../models';

chai.use(chaiHttp);
let baseUrl = '/forum/apis/v1/questions';

describe('Tests for questions>>>>>>>', function () {
    let token;
    let questionId;
    before('creates a test user and question before testing', function (done) {
        chai.request(server)
            .post('/forum/apis/v1/users/signup')
            .send({
                email: 'jane@doe.com',
                name: 'Jane Doe',
                password: 'password'
            })
            .end(function (err, res) {
                token = res.body.token;
                chai.request(server)
                    .post(`${baseUrl}/`)
                    .set('token', token)
                    .send({
                        body: 'Lorem ipsum Lorem Ipsum Lorem ipsum Lorem Ipsum',
                        title: 'Lorem'
                    })
                    .end(function (err, res) {
                        questionId = res.body.question._id;
                        done();
                    })
            })
    });
    after('deletes collection after testing', function (done) {
       User.deleteMany({})
        .then(function() {
            Question.deleteMany({})
            .then(function() { done();})
        })
    });

    describe('Tests for Posting a question', function() {
        it('should not post a question with no title field', function (done) {
            chai.request(server)
                .post(`${baseUrl}/`)
                .set('token', token)
                .send({
                    body: 'Lorem ipsum Lorem Ipsum Lorem ipsum Lorem Ipsum',
                    title: null
                })
                .end(function (err, res) {
                    expect(res.status).to.equal(400);
                    expect(res.body.errors[0]).equal('title cannot be empty');
                    done();
                })
        })
        it('should not post a question with no body field', function (done) {
            chai.request(server)
                .post(`${baseUrl}/`)
                .set('token', token)
                .send({
                    body: null,
                    title: 'Lorem'
                })
                .end(function (err, res) {
                    expect(res.status).to.equal(400);
                    expect(res.body.errors[0]).equal('body cannot be empty');
                    done();
                })
        })
        it('should post a question when all fields are present', function (done) {
            chai.request(server)
                .post(`${baseUrl}/`)
                .set('token', token)
                .send({
                    body: 'Lorem ipsum Lorem Ipsum Lorem ipsum Lorem Ipsum',
                    title: 'Lorem'
                })
                .end(function (err, res) {
                    expect(res.status).to.equal(201);
                    expect(res.body.msg).equal('question successfully created');
                    expect(res.body).to.have.property('question')
                    done();
                })
        })
    });

    describe('Tests to view questions', function () {
        it('should return questions when a request to fetch questions is made', function (done) {
            chai.request(server)
                .get(`${baseUrl}/`)
                .end(function (err, res) {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.have.property('questions')
                    done();
                })
        })
        it('should fetch a question specified by id', function (done) {
            chai.request(server)
                .get(`${baseUrl}/${questionId}`)
                .end(function (err, res) {
                    expect(res.status).to.equal(200);
                    expect(res.body.question).to.have.property('votes');
                    expect(res.body.question).to.have.property('title');
                    expect(res.body.question).to.have.property('body');
                    done();
                })
        })
    });

    describe('Tests for answering a question', function() {
        it('should validate against posting null answers', function(done) {
            chai.request(server)
            .post(`${baseUrl}/answers`)
            .set('token', token)
            .send({
                questionId,
                body: null,
            })
            .end(function (err, res) {
                expect(res.status).to.equal(400);
                expect(res.body.errors[0]).equal('body cannot be empty');
                done();
            })
        })
        it('should validate against invalid questionId', function(done) {
            chai.request(server)
            .post(`${baseUrl}/answers`)
            .set('token', token)
            .send({
                questionId: 'randonId',
                body: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum'
            })
            .end(function (err, res) {
                expect(res.status).to.equal(400);
                expect(res.body.errors[0]).equal('invalid questionId');
                done();
            })
        })
        it('should post an answer with valid parameters', function(done) {
            chai.request(server)
            .post(`${baseUrl}/answers`)
            .set('token', token)
            .send({
                questionId,
                body: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum'
            })
            .end(function (err, res) {
                expect(res.status).to.equal(201);
                expect(res.body.msg).equal('answer successfully created');
                expect(res.body).to.have.property('question');
                done();
            })
        })
    })


})

