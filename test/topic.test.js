const request = require('supertest');
const sinon = require('sinon');
const app = require('../app');
const {topicModel} = require('../db/mdl_topic');

const error = new Error('some fake error');
// Update topic
describe('Test topic UPDATE API', () => {
  test('It should response success: 200', async () => {
    const mocktopicModel = sinon.stub(topicModel, 'edit');
    mocktopicModel.withArgs('id', {name: 'john'}).returns({});
    const response = await request(app).put('/topic/id').send({name: 'john'});
    expect(response.statusCode).toBe(200);
    mocktopicModel.restore();
  });
  test('It should response Error: 500', async () => {
    const mocktopicModel = sinon.stub(topicModel, 'edit');
    mocktopicModel.withArgs('id', {name: 'john'}).throws(error);
    const response = await request(app).put('/topic/id').send({name: 'john'});
    expect(response.statusCode).toBe(500);
    mocktopicModel.restore();
  });
});
// GET topic detail
describe('Test GET topic detail API', () => {
  test('It should response success: 200', async () => {
    const mocktopicModel = sinon.stub(topicModel, 'findById');
    mocktopicModel.returns({});
    const response = await request(app).get('/topic/id');
    expect(response.statusCode).toBe(200);
    mocktopicModel.restore();
  });
  // 500
  test('It should response error: 500', async () => {
    const mocktopicModel = sinon.stub(topicModel, 'findById');
    mocktopicModel.throws(error);
    const response = await request(app).get('/topic/id');
    expect(response.statusCode).toBe(500);
    mocktopicModel.restore();
  });
});
// GET topic api
describe('Test topic GET API', () => {
  test('It should response the GET method', async () => {
    const mocktopicModel = sinon.stub(topicModel, 'list');
    mocktopicModel.returns([]);
    const response = await request(app).get('/topic');
    expect(response.statusCode).toBe(200);
    mocktopicModel.restore();
  });
  // 500
  test('It should response error: 500', async () => {
    const mocktopicModel = sinon.stub(topicModel, 'list');
    mocktopicModel.throws(error);
    const response = await request(app).get('/topic');
    expect(response.statusCode).toBe(500);
    mocktopicModel.restore();
  });
});

// POST topic API
describe('Test topic POST API', () => {
  test('It should response success: 200', async () => {
    const mocktopicModel = sinon.stub(topicModel, 'insert');
    mocktopicModel.withArgs('abc').returns({});
    const response = await request(app).post('/topic').send({name: 'john'});
    expect(response.statusCode).toBe(201);
    mocktopicModel.restore();
  });
  test('It should response Error: 500', async () => {
    const mocktopicModel = sinon.stub(topicModel, 'insert');
    mocktopicModel.withArgs({name: 'john'}).throws(error);
    const response = await request(app).post('/topic').send({name: 'john'});
    expect(response.statusCode).toBe(500);
    mocktopicModel.restore();
  });
});

// Test delete topic API
describe('Test topic DELETE API', () => {
  test('It should response success: 200', async () => {
    const mocktopicModel = sinon.stub(topicModel, 'del');
    mocktopicModel.withArgs('abc').returns({
      acknowledged: true,
      deletedCount: 1,
    });
    const response = await request(app).delete('/topic/abc');
    expect(response.statusCode).toBe(200);
    mocktopicModel.restore();
  });
  test('It should response Error: 500', async () => {
    const mocktopicModel = sinon.stub(topicModel, 'del');
    mocktopicModel.withArgs('abc').throws(error);
    const response = await request(app).delete('/topic/abc');
    expect(response.statusCode).toBe(500);
    mocktopicModel.restore();
  });
  test('It should response Error: 404', async () => {
    const mocktopicModel = sinon.stub(topicModel, 'del');
    mocktopicModel.withArgs('abc').returns({
      acknowledged: false,
      deletedCount: 0,
    });
    const response = await request(app).delete('/topic/abc');
    expect(response.statusCode).toBe(404);
    mocktopicModel.restore();
  });
});
