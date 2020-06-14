
/**
 * The flow
 * create a user
 * create a question
 * subscribe to the question
 * answers the question
 * check notifications
 * view notifications
 * unsubscribe to the question
 * view notifications
 * 
 */

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../index';
import { User, Question, Notification, Subscription } from '../models';

chai.use(chaiHttp);
let baseUrl = '/forum/apis/v1';

describe('All tests for subscription and notification', function() {
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
                    .post(`${baseUrl}/questions`)
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
            .then(function() { 
                Subscription.deleteMany({})
                .then(function (){
                    Notification.deleteMany({})
                    .then(function(){ done();})
                })
             })
        })
    });


    describe('Tests for subscribing to a question', function(done) {
        it('should ensure that a user can subscribe to a question', function(done) {
            chai.request(server)
            .post(`${baseUrl}/subscriptions/questions`)
            .set('token', token)
            .send({
                questionId
            })
            .end(function (err, res) {
                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('msg');
                done();
            })
        })
        it('should validate against subscribing to an invalid question id', function(done) {
            chai.request(server)
            .post(`${baseUrl}/subscriptions/questions`)
            .set('token', token)
            .send({
                questionId:'r4'
            })
            .end(function (err, res) {
                expect(res.status).to.equal(400);
                done();
            })
        })
    })

    describe('Tests for recieving notifications', function() {
        it('answering question .....', function(done) {
            chai.request(server)
            .post(`${baseUrl}/questions/answers`)
            .set('token', token)
            .send({
                body: 'Loremz',
                questionId
            })
            .end(function (err, res) {
                done();
            })
        })
        it('should ensure that a user can receive notifications on subscribed questions', function(done) {
            chai.request(server)
            .get(`${baseUrl}/notifications`)
            .set('token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            })
        })
    })
})
