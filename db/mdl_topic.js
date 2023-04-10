const mongoose = require('mongoose');
const shortid = require('shortid');
const {logger} = require("../helper/logger")
// mongoose.connect(
// 	"mongodb://localhost:27017/notesdb"
//   );
const topicSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      default: shortid(),
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {collection: 'topics'}
); // avoid auto create modle

const topicModel = mongoose.model('topics', topicSchema);

// var topicModel = module.exports = mongoose.model('topics', topicSchema);

// Delete
exports.topicModel = {
  async findById(id) {
    try {
      const topics = await topicModel.findById(id).exec();
      return topics;
    } catch (error) {
      throw new Error(error);
    }
  },
  async edit(id, data) {
    try {
      const aaa = await topicModel.updateOne({_id: id}, data);
      return aaa;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
  async list() {
    try {
      const topics = await topicModel.find({});
      return topics;
    } catch (error) {
      throw new Error(error);
    }
  },
  async insert(data) {
    try {
      const fluffy = new topicModel(data);
      const aaa = await fluffy.save();
      return aaa;
    } catch (error) {
      console.log(error);
      logger.error(error.message, {serice: "Mdl_topic.js"});
      throw error;
    }
  },
  async del(id) {
    try {
      // await MyModel.deleteOne(filter);
      const topics = await topicModel.deleteOne({_id: id});
      return topics;
    } catch (error) {
      throw new Error(error);
    }
  },
};
