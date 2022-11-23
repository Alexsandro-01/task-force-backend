import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import Sinon from 'sinon';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';

import server from '../../server';
import Tasks from '../../database/models/Tasks';
import Users from '../../database/models/Users';

import { token, user, invalidUserToken } from '../mocks/users';
import { validNewTask } from '../mocks/tasks';

chai.use(chaiHttp);

describe('Behavior /tasks/update/:id route', () => {
  const taskRoute = '/tasks/update/1';
  const validToken = `${token[0]}${token[1]}${token[2]}`;

  describe('Success cases', () => {
    beforeEach(() => {
      Sinon.stub(Tasks, 'update').resolves([1]);
      Sinon.stub(Tasks, 'findOne').resolves(true as any);
      Sinon.stub(Users, 'findOne').resolves(user as any);
      Sinon.stub(jwt, 'verify').callsFake(() => ({ key: user.id }));
      Sinon.stub(fs, 'readFile').resolves('SuaChaveDoJWT');
    });

    afterEach(Sinon.restore);

    it('Shoud return status 204 if a request with body content only key "task", and header authorization have been passed', async () => {
      const response = await chai.request(server)
      .post(taskRoute)
      .set({
        authorization: `Bearer ${validToken}`
      })
      .send({
        "task": "Some update here"
      });

      expect(response.status).to.equal(204);
    });

    it('Shoud return status 204 if a request with body content only key "active", and header authorization have been passed', async () => {
      const response = await chai.request(server)
      .post(taskRoute)
      .set({
        authorization: `Bearer ${validToken}`
      })
      .send({
        "active": false
      });

      expect(response.status).to.equal(204);
    });
  });

  describe('Failure cases', () => {
    beforeEach(() => {
      Sinon.stub(Tasks, 'update').resolves([1]);
      Sinon.stub(Tasks, 'findOne').resolves(true as any);
      Sinon.stub(Users, 'findOne').resolves(user as any);
      Sinon.stub(jwt, 'verify').callsFake(() => ({ key: user.id }));
      Sinon.stub(fs, 'readFile').resolves('SuaChaveDoJWT');
    });

    afterEach(Sinon.restore);

    it('Shoud return a message "Empyt or invalid token" if header authorization not passed', async () => {
      const response = await chai.request(server)
      .post(taskRoute)
      .send({
        "task": "Some update here"
      });

      expect(response.body.message).to.equal('Empyt or invalid token');
    });

    it('Shoud return a message "Empyt or invalid token" if Bearer token format not passed on header authorization', async () => {
      const response = await chai.request(server)
      .post(taskRoute)
      .set({
        authorization: validToken
      })
      .send({
        "task": "Some update here"
      });

      expect(response.body.message).to.equal('Empyt or invalid token');
    });
  });
});