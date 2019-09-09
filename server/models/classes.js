const connection = require('../config/database');

let classSchema = new connection.Schema({
	className: {
		type: String,
		require: true
	},
	trainerName: {
		type: String,
		require: true
	},
	start: {
		type: String,
		require: true
	},
	finish: {
		type: String,
		require: true
	},
	managerId: {
		type: String,
		require: true
	}
});

let classes = connection.model('classes', classSchema);

module.exports = classes;
