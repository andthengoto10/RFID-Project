const connection = require('../config/database');

let usersSchema = new connection.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true
	}
});

let users = connection.model('users', usersSchema);

module.exports = users;
