const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const {insert, list, findById, edit, deleteTopic} = require("../db/mdl_topic")


// CRUD

// Get all topic
router.get('/', async function(req, res, next) {
    try {
        const topics = await list();
        res.json(topics);
    } catch (error) {
        console.log(error);
        next(error)
    }
});
// get one topic
router.get('/:id', async function(req, res, next) {
    const id = req.params.id;
    try {
        const topics = await findById(id);
        res.json(topics);
    } catch (error) {
        next(error)
    }
  });
// insert new topic
router.post('/', async function(req, res, next) {
    const body = req.body;
    const newTopic = {
        name: body.name
    }
    try {
        const topic = await insert(newTopic);
        res.json(topic);
    } catch (error) {
        next(error)
    }
  });
// update topic
router.put('/:id', async function(req, res, next) {
    const id = req.params.id;
    try {
        const topics = await edit(id, req.body);
        res.json(topics);
    } catch (error) {
        next(error)
    }
  });

// delete topic
router.delete('/:id', async function(req, res, next) {
    const id = req.params.id;
    try {
        const topics = await deleteTopic(id);
        res.json(topics);
    } catch (error) {
        next(error)
    }
  });
module.exports = router;
