import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../index';
import { User, Question } from '../models';

chai.use(chaiHttp);
let baseUrl = '/forum/apis/v1/search';
let token;
let questionId;



describe('All test for search endpoints', function () {
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
                    .post('/forum/apis/v1/questions')
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
            .then(function () {
                Question.deleteMany({})
                    .then(function () {
                        done();
                    })
            })
    });

    it('should return users matching email or name specified', function (done) {
        chai.request(server)
            .get(`${baseUrl}/users?keyword=doe`)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res.body.msg).equal('user(s) found');
                done();
            })
    })
    it('should return no users if none matches email or name specified', function (done) {
        chai.request(server)
            .get(`${baseUrl}/users?keyword=xqqqq`)
            .end(function (err, res) {
                expect(res.status).to.equal(404);
                expect(res.body.msg).equal('no user found with specified name or email');
                done();
            })
    })
    it('should return questions matching keyword specified', function (done) {
        chai.request(server)
            .get(`${baseUrl}/questions?keyword=Lorem`)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res.body.questions.length).equal(1);
                expect(res.body.msg).to.equal('questions found for specified keyword')
                done();
            })
    })
    it('should return no questions if none matches the keyword specified', function (done) {
        chai.request(server)
            .get(`${baseUrl}/questions/?keyword=jbgfjgb`)
            .end(function (err, res) {
                expect(res.status).to.equal(404);
                expect(res.body.questions.length).equal(0);
                expect(res.body.msg).to.equal('no questions found for specified keyword')
                done();
            })
    })
})