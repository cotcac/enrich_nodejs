const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const {topicModel} = require('../db/mdl_topic');
const {logger} = require("../helper/logger")

// CRUD

// Get all topic
router.get('/', async function (req, res, next) {
  logger.info('hello', { message: 'Get topic start', 'service': "topic" });
  try {
    logger.info("Started query topic list from mongodb");
    const topics = await topicModel.list(); // mock me
    logger.info("Get topics success");
    res.json(topics);
  } catch (error) {
    logger.error("some error");
    next(error);
  }
});
// get one topic
router.get('/:id', async function (req, res, next) {
  const id = req.params.id;
  try {
    const topics = await topicModel.findById(id); // mock me
    res.json(topics);
  } catch (error) {
    next(error);
  }
});
// insert new topic | Please use express-validator to validate data
router.post('/', async function (req, res, next) {
  const body = req.body;
  const newTopic = {
    name: body.name,
  };
  try {
    // Will mock this in UT
    const topic = await topicModel.insert(newTopic);
    res.status(201).json(topic);
  } catch (error) {
    next(error);
  }
});
// update topic
router.put('/:id', async function (req, res, next) {
  const id = req.params.id;
  try {
    const topics = await topicModel.edit(id, req.body); // mock me
    res.json(topics);
  } catch (error) {
    next(error);
  }
});

// delete topic
router.delete('/:id', async function (req, res, next) {
  const id = req.params.id;
  try {
    // find in db first.
    // check response
    const topics = await topicModel.del(id);
    if (topics.deletedCount === 0) {
      return res.status(404).send('Not found');
    }
    res.json(topics);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
