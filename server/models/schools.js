const connection = require('../config/database');

let schoolsSchema = new connection.Schema({
	schoolName: {
		type: String,
		required: true
	},
	street: {
		type: String,
		required: true
	},
	postalCode: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	managerId: {
		type: String,
		required: true
	}
});

let schools = connection.model('schools', schoolsSchema);

module.exports = schools;
