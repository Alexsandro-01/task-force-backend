import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';

import server from '../../server';
import Tasks from '../../database/models/Tasks';

import { token, user, invalidUserToken } from '../mocks/users';
import { validNewTask } from '../mocks/tasks';
import Users from '../../database/models/Users';

chai.use(chaiHttp);


describe('Behavior /task route', () => {
  const taskRoute = '/task/create';
  const validToken = `${token[0]}${token[1]}${token[2]}`;

  describe('Success cases', () => {
    beforeEach(() => {
      sinon.stub(Tasks, 'create').resolves();
      sinon.stub(Users, 'findOne').resolves(user as any);
      sinon.stub(jwt, 'verify').callsFake(() => ({ key: user.id }));
      sinon.stub(fs, 'readFile').resolves('SuaChaveDoJWT');
    })

    afterEach(sinon.restore)

    it('Should return status 201 if request body and header authorization is ok', async () => {
      const response = await chai.request(server)    
      .post(taskRoute)
      .set({
        authorization: `Bearer ${validToken}`
      })
      .send(validNewTask);

      expect(response.status).to.be.equal(201);
    });
  });

  describe('Failure cases', () => {
    beforeEach(() => {
      sinon.stub(Tasks, 'create').resolves();
      sinon.stub(Users, 'findOne').resolves();
      sinon.stub(jwt, 'verify').callsFake(() => ({ key: user.id }));
      sinon.stub(fs, 'readFile').resolves('SuaChaveDoJWT');
    })

    afterEach(sinon.restore)

    it('Should return an error with message "Task is required" case task key isn´t provided in body request', async () => {
      const response = await chai.request(server)    
      .post(taskRoute)
      .set({
        authorization: `Bearer ${validToken}`
      })
      .send({ active: true });

      expect(response.body).to.deep.equal({
        "message": "Task is required"
      });
    });

    it('Should return an error with message "Task must be a string" case task key to be no string', async () => {
      const response = await chai.request(server)    
      .post(taskRoute)
      .set({
        authorization: `Bearer ${validToken}`
      })
      .send({ task: 2 , active: true });

      expect(response.body).to.deep.equal({
        "message": "Task must be a string"
      });
    });

    it('Should return an error with message "Active is required" case active key isn´t provided in body request', async () => {
      const response = await chai.request(server)    
      .post(taskRoute)
      .set({
        authorization: `Bearer ${validToken}`
      })
      .send({ task: 'Some task here' });

      expect(response.body).to.deep.equal({
        "message": "Active is required"
      });
    });

    it('Should return an error with message "Active must be a boolean" case active key to be no boolean', async () => {
      const response = await chai.request(server)    
      .post(taskRoute)
      .set({
        authorization: `Bearer ${validToken}`
      })
      .send({ task: 'Some task here' , active: 'true' });

      expect(response.body).to.deep.equal({
        "message": "Active must be a boolean"
      });
    });

    it('Should return an error with message "Empyt or invalid token" case header Authorization don\'t have a token', async () => {
      const response = await chai.request(server)    
      .post(taskRoute)
      .send({ task: 'Some task here' , active: true });

      expect(response.body).to.deep.equal({
        "message": "Empyt or invalid token"
      });
    });

    it('Should return an error with message "Empyt or invalid token" case header Authorization don´t implement Bearer authorization', async () => {
      const response = await chai.request(server)    
      .post(taskRoute)
      .set({
        authorization: `${validToken}`
      })
      .send({ task: 'Some task here' , active: true });

      expect(response.body).to.deep.equal({
        "message": "Empyt or invalid token"
      });
    });

    it('Should return an error with message "Sorry for the inconvenience, but the service is unavailable. Please try again later." case the conexion with DB is unavailable when try find user', async () => {
      sinon.restore();
      sinon.stub(Users, 'findOne').rejects();
      sinon.stub(jwt, 'verify').callsFake(() => ({ key: user.id }));
      sinon.stub(fs, 'readFile').resolves('SuaChaveDoJWT');

      const response = await chai.request(server)    
      .post(taskRoute)
      .set({
        authorization: `Bearer ${validToken}`
      })
      .send({ task: 'Some task here' , active: true });

      expect(response.body).to.deep.equal({
        "message": "Sorry for the inconvenience, but the service is unavailable. Please try again later."
      });
    });

    it('Should return an error with message "Sorry for the inconvenience, but the service is unavailable. Please try again later." case the conexion with DB is unavailable when try create task', async () => {
      sinon.restore();
      sinon.stub(Users, 'findOne').resolves(user as any);
      sinon.stub(Tasks, 'create').rejects();
      sinon.stub(jwt, 'verify').callsFake(() => ({ key: user.id }));
      sinon.stub(fs, 'readFile').resolves('SuaChaveDoJWT');

      const response = await chai.request(server)    
      .post(taskRoute)
      .set({
        authorization: `Bearer ${validToken}`
      })
      .send({ task: 'Some task here' , active: true });

      expect(response.body).to.deep.equal({
        "message": "Sorry for the inconvenience, but the service is unavailable. Please try again later."
      });
    });

    it('Should return an error with message "Empyt or invalid token" case the user from token does not exist', async () => {
      const response = await chai.request(server)    
      .post(taskRoute)
      .set({
        authorization: `Bearer ${invalidUserToken[0],invalidUserToken[1], invalidUserToken[2]}`
      })
      .send({ task: 'Some task here' , active: true });

      expect(response.body).to.deep.equal({
        "message": "Empyt or invalid token"
      });
    });

    
  });

});