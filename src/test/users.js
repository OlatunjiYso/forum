import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../index'
import { User } from '../models';

chai.use(chaiHttp);
const baseUrl = '/forum/apis/v1/users'

describe('Tests for user signup', function () {
    before('create a test user before testing', function (done) {
        User.create({
            name: 'John Doe',
            email: 'john@doe.com',
            password: 'password'
        })
            .then(function (err) { done() })
    });
    after('deletes all users after testing', function (done) {
        User.deleteMany({})
            .then(function () { done() })

    });
    it('should validate against null email, name and password', function (done) {
        chai.request(server)
            .post(`${baseUrl}/signup`)
            .send({
                email: null,
                name: null,
                password: null
            })
            .end(function (err, res) {
                expect(res.status).to.equal(400);
                expect(res.body).to.have.property('errors');
                expect(res.body.errors[0]).to.equal('email is required');
                expect(res.body.errors[1]).to.equal('Password is required');
                expect(res.body.errors[2]).to.equal('Invalid name');
                done();
            })
    })
    it('should validate against invalid emails', function (done) {
        chai.request(server)
            .post(`${baseUrl}/signup`)
            .send({
                email: 'random mail',
                name: 'name',
                password: 'password'
            })
            .end(function (err, res) {
                expect(res.status).to.equal(400);
                expect(res.body.errors[0]).to.equal('email is invalid');
                done();
            })
    })
    it('should validate against passwords less than 6 characters', function (done) {
        chai.request(server)
            .post(`${baseUrl}/signup`)
            .send({
                email: 'random@mail.com',
                name: 'name',
                password: 'pa'
            })
            .end(function (err, res) {
                expect(res.status).to.equal(400);
                expect(res.body.errors[0]).to.equal('Password must be a minimum of 6 characters');
                done();
            })
    })
    it('should not signup a user with a taken email', function (done) {
        chai.request(server)
            .post(`${baseUrl}/signup`)
            .send({
                email: 'john@doe.com',
                name: 'name',
                password: 'password'
            })
            .end(function (err, res) {
                expect(res.status).to.equal(403);
                expect(res.body.msg).equal('this email is taken already');
                done();
            })
    })
    it('should signup a user with valid credentials', function (done) {
        chai.request(server)
            .post(`${baseUrl}/signup`)
            .send({
                email: 'jane@doe.com',
                name: 'Jane Doe',
                password: 'password'
            })
            .end(function (err, res) {
                expect(res.status).to.equal(201);
                expect(res.body.msg).equal('you are signed up!');
                done();
            })
    })
})

describe('Tests for user login', function () {
    before('creates a test user before testing', function (done) {
        chai.request(server)
        .post(`${baseUrl}/signup`)
        .send({
            email: 'jane@doe.com',
            name: 'Jane Doe',
            password: 'password'
        })
        .end(function (err, res) {
            done();
        })
    });
    after('deletes all users after testing', function (done) {
        User.deleteMany({})
            .then(function () { done() })

    });
    it('should not login a user with an incorrect password', function (done) {
        chai.request(server)
            .post(`${baseUrl}/login`)
            .send({
                email: 'jane@doe.com',
                password: 'wrongpassword'
            })
            .end(function (err, res) {
                expect(res.status).to.equal(401);
                expect(res.body.msg).equal('incorrect email or password');
                done();
            })
    })
    it('should not login a user with an incorrect email', function (done) {
        chai.request(server)
            .post(`${baseUrl}/login`)
            .send({
                email: 'fvffgjane@doe.com',
                password: 'password'
            })
            .end(function (err, res) {
                expect(res.status).to.equal(401);
                expect(res.body.msg).equal('incorrect email or password');
                done();
            })
    })
    it('should login a user with correct email and password', function (done) {
        chai.request(server)
            .post(`${baseUrl}/login`)
            .send({
                email: 'jane@doe.com',
                password: 'password'
            })
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res.body.msg).equal('You are logged in');
                done();
            })
    })
    it('should send web token upon successful login', function (done) {
        chai.request(server)
            .post(`${baseUrl}/login`)
            .send({
                email: 'jane@doe.com',
                password: 'password'
            })
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('token');
                done();
            })
    })
})