const mongoose = require('mongoose');
const shortid = require('shortid');
// mongoose.connect(
// 	"mongodb://localhost:27017/notesdb"
//   );
const topicSchema = mongoose.Schema({
	_id:{
		type:String,
		default: shortid(),
		trim: true
	},
	name:{
		type:String,
		required:true,
		trim:true
	},
},{collection:'topics'}); // avoid auto create modle

const topicModel = mongoose.model('topics', topicSchema);

// var topicModel = module.exports = mongoose.model('topics', topicSchema);
//insert
module.exports.insert = async function(data){
	try {
		const fluffy = new topicModel(data);
		const aaa = await fluffy.save();
		return aaa
	} catch (error) {
		console.log(error);
		throw error;
	}
}
// list
module.exports.list = async function(){
	try {
		const topics = await topicModel.find({});
		return topics
	} catch (error) {
		throw new Error(error);
	}
}

// get one 
module.exports.findById = async function(id){
	try {
		const topics = await topicModel.findById(id).exec();
		return topics
	} catch (error) {
		throw new Error(error);
	}
}

module.exports.edit = async function(id, data){
	try {
		const aaa = await topicModel.updateOne({_id: id}, data);
		return aaa
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
}
// Delete
module.exports.deleteTopic = async function(id){
	try {
		// await MyModel.deleteOne(filter);
		const topics = await topicModel.deleteOne({_id:id});
		return topics
	} catch (error) {
		throw new Error(error);
	}
}

// get limit
module.exports.liveSearch = function(query, callback){
	topicModel.find(query,{title:1, category:1, date:1}, callback).sort({date:-1}).limit(24);
}