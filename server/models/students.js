const connection = require('../config/database');

let studentsSchema = new connection.Schema({
	studentName: {
		type: String,
		required: true
	},
	studentVorName: {
		type: String,
		required: true
	},
	matrikelNumber: {
		type: String,
		required: true
	},
	studentEmail: {
		type: String,
		required: true
	},
	studentPassword: {
		type: String,
		required: true
	},
	className: {
		type: String,
		required: true
	},
	comingTime: {
		type: String,
		required: true
	},
	leavingTime: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true
	}
});

let students = connection.model('students', studentsSchema);

module.exports = students;
