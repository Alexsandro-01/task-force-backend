import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';

import server from '../../server';
import Users from '../../database/models/Users';

chai.use(chaiHttp);

import {
  user,
  validUserLogin,
  responseValidLogin,
  invalidUserLoginEmail,
  invalidUserLoginPasswod,
} from '../mocks/users';

describe('Behavior /login route', () => {
  const loginRoute = '/user/login';

  describe('Success cases', () => {
    beforeEach(() => {
      sinon.stub(Users, 'findOne').resolves(user as unknown as Users);
      sinon.stub(jwt, 'sign').callsFake(() => responseValidLogin.token);
      sinon.stub(fs, 'readFile').resolves('SuaChaveDoJWT');
    });

    afterEach(sinon.restore);

    it('Should return status 200 if valid user', async () => {
      const response = await chai.request(server)
      .post(loginRoute).send(validUserLogin);

      expect(response.status).to.equal(200);
    });

    it('Should return an Object with keys "name" and "token", both should be valid', async () => {
      const response = await chai.request(server)
        .post(loginRoute).send(validUserLogin);

      const body = response.body;
      expect(body).to.deep.equal(responseValidLogin);
    });
  });

  describe('Failure cases', () => {
    beforeEach(() => {
      sinon.stub(Users, 'findOne').resolves(null);
      sinon.stub(jwt, 'sign').callsFake(() => responseValidLogin.token);
    });

    afterEach(sinon.restore);
    it('Should return an error with message "Email is required" case email key isn´t provided in body request', async () => {
      const response = await chai.request(server)
        .post(loginRoute).send({
          password: validUserLogin.password
        });

      const body = response.body;
      expect(body).to.deep.equal({ "message": "Email is required" });
    });

    it('Should return status 400 case password key isn´t provided in body request', async () => {
      const response = await chai.request(server)
        .post(loginRoute).send({
          password: validUserLogin.password
        });

      const status = response.status;
      expect(status).to.equal(400);
    });

    it('Should return an error with message "Password is required" case email key isn´t provided in body request', async () => {
      const response = await chai.request(server)
        .post(loginRoute).send({
          email: validUserLogin.email
        });

      const body = response.body;
      expect(body).to.deep.equal({ "message": "Password is required" });
    });

    it('Should return an error with status 400 case email key isn´t provided in body request', async () => {
      const response = await chai.request(server)
        .post(loginRoute).send({
          email: validUserLogin.email
        });

      const status = response.status;
      expect(status).to.equal(400);
    });

    it('Should return an error with message "Invalid email or password, try again." case password is wrong', async () => {
      const response = await chai.request(server)
        .post(loginRoute).send(invalidUserLoginPasswod);

      const body = response.body;
      expect(body).to.deep.equal({ "message": "Invalid email or password, try again." });
    });

    it('Should return status 401 case password is wrong', async () => {
      const response = await chai.request(server)
        .post(loginRoute).send(invalidUserLoginPasswod);

      const status = response.status;
      expect(status).to.deep.equal(401);
    });

    it('Should return an error with message "Invalid email or password, try again." case email is wrong', async () => {
      const response = await chai.request(server)
        .post(loginRoute).send(invalidUserLoginEmail);

      const body = response.body;
      expect(body).to.deep.equal({ "message": "Invalid email or password, try again." });
    });

    it('Should return status 401 case email is wrong', async () => {
      const response = await chai.request(server)
        .post(loginRoute).send(invalidUserLoginEmail);

      const status = response.status;
      expect(status).to.deep.equal(401);
    });

  });
});