import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../index';
import { User, Question, Vote } from '../models';

chai.use(chaiHttp);
let baseUrl = '/forum/apis/v1/questions';

describe('All tests for votes', function() {
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
    after('deletes test data after testing', function (done) {
       User.deleteMany({})
        .then(function() {
            Question.deleteMany({})
            .then(function() { 
                Vote.deleteMany({})
                .then(function() { done(); })
            })
        })
    });

it('should ensure that only authenticated users can vote', function(done) {
    chai.request(server)
    .post(`${baseUrl}/votes`)
    .send({
        questionId,
        type: 'upvote'
    })
    .end(function (err, res) {
        expect(res.status).to.equal(401);
        expect(res.body.msg).equal('no token!');
        done();
    })
}) 
it('should ensure that a question exists for the specified question id', function(done) {
    chai.request(server)
    .post(`${baseUrl}/votes`)
    .set('token', token)
    .send({
        questionId: 'random id',
        type: 'upvote'
    })
    .end(function (err, res) {
        expect(res.status).to.equal(400);
        expect(res.body.errors[0]).equal('invalid questionId');
        done();
    })
});
it('should ensure that a vote has a valid type', function(done) {
    chai.request(server)
    .post(`${baseUrl}/votes`)
    .set('token', token)
    .send({
        questionId: questionId,
        type: 'upv'
    })
    .end(function (err, res) {
        expect(res.status).to.equal(400);
        expect(res.body.errors[0]).equal('invalid type');
        done();
    })
});
it('should ensure that a question can be upvoted', function(done) {
    chai.request(server)
    .post(`${baseUrl}/votes`)
    .set('token', token)
    .send({
        questionId,
        type: 'upvote'
    })
    .end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.msg).equal('your vote has been added');
        expect(res.body.question.votes).to.equal(1);
        done();
    })
})
it('should ensure that a question can only be upvoted once by a user', function(done) {
    chai.request(server)
    .post(`${baseUrl}/votes`)
    .set('token', token)
    .send({
        questionId,
        type: 'upvote'
    })
    .end(function (err, res) {
        expect(res.status).to.equal(403);
        expect(res.body.msg).equal('You have already upvoted this question');
        expect(res.body.question.votes).to.equal(1);
        done();
    })
});
it('should ensure that an upvoted question can be downvoted back by a user', function(done) {
    chai.request(server)
    .post(`${baseUrl}/votes`)
    .set('token', token)
    .send({
        questionId,
        type: 'downvote'
    })
    .end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.msg).equal('your vote has been updated');
        expect(res.body.question.votes).to.equal(-1);
        done();
    })
})
})