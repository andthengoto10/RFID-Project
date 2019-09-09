const Users = require('../models/users');
const Classes = require('../models/classes');
const Schools = require('../models/schools');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// this func is to create a newUser
exports.newUser = (req, res) => {
	const { name, email, password, role } = req.body;
	console.log(req.body);
	let errors = [];

	if (password.length < 6) {
		errors.push({ msg: 'Password must be at least 6 characters' });
	}
	if (errors.length > 0) {
		res.json({
			status: 'error',
			errors
		});
	} else {
		Users.findOne({ email: email }).then((user) => {
			if (user) {
				errors.push({ msg: 'Email already exists' });
				res.json({
					status: 'error',
					errors
				});
			} else {
				// if there is no exists email add new user
				const newUser = new Users({
					name,
					email,
					password,
					role
				});
				// hash passport
				// genSalt is a method for bcrypt and 10 is number of characters
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) throw err;
						// set password to hashed
						newUser.password = hash;
						// save user
						newUser
							.save()
							.then((user) => {
								console.log(user);
								res.json({
									status: 'success'
								});
							})
							.catch((err) => {
								// console.log(err);
								res.json({ status: 'error', errors: err });
							});
					});
				});
			}
		});
	}
};
exports.loginUser = (req, res) => {
	const { email, password } = req.body;
	let errors = [];
	if (!email) {
		errors.push({ msg: 'Enter email address' });
	}
	if (password.trim().length < 6) {
		errors.push({ msg: 'Password must be at least 6 characters' });
		res.json({
			status: 'error',
			errors
		});
	} else {
		Users.findOne({ email: email }).then((user) => {
			if (!user) {
				errors.push({ msg: 'That email is not registered' });
				console.log(errors);
				res.json({
					status: 'error',
					errors
				});
			} else {
				// Match password
				// compare existing passport and user passports
				bcrypt.compare(password, user.password, (err, result) => {
					if (err) {
						errors.push({ msg: 'Something happened with server please try again!' });
						res.json({
							status: 'error',
							errors
						});
					}
					if (result === true) {
						// console.log(user['_doc']);
						let token = jwt.sign({ id: user._id, role: user.role }, 'keyboard cat 4 ever', {
							expiresIn: 129600
						}); // Signing the token
						// console.log(token);

						res.json({
							status: 'success',
							token,
							name: user.name,
							id: user._id,
							role: user.role
						});
					} else {
						errors.push({ msg: 'Entered Password and Hash do not match!' });
						res.json({
							status: 'error',
							errors,
							token: null
						});
					}
				});
			}
		});
	}
};
exports.newSchool = (req, res) => {
	const { schoolName, street, postalCode, city, managerId } = req.body;
	console.log(req.body);
	let errors = [];

	Schools.findOne({ schoolName: schoolName }).then((newSchool) => {
		if (newSchool) {
			errors.push({ msg: 'School name already exists' });
			res.json({
				status: 'error',
				errors
			});
		} else {
			const newSchool = new Schools({
				schoolName,
				street,
				postalCode,
				city,
				managerId
			});
			newSchool
				.save()
				.then((newSchool) => {
					console.log(newSchool);
					res.json({
						status: 'success',
						newSchool
					});
				})
				.catch((err) => {
					console.log(err);
					res.json({ status: 'error', errors: err });
				});
		}
	});
};
exports.getSchool = (req, res) => {
	Schools.findOne({ managerId: req.params.id }).then((isSchool) => {
		if (isSchool) {
			res.json({
				status: 'hasSchool',
				isSchool
			});
		} else {
			res.json({
				status: 'hasNotSchool'
			});
		}
	});
};
exports.newClass = (req, res) => {
	const { className, trainerName, start, finish, managerId } = req.body;
	console.log(req.body);
	let errors = [];

	Classes.findOne({ className: className }).then((newClass) => {
		if (newClass) {
			errors.push({ msg: 'Class name already exists' });
			res.json({
				status: 'error',
				errors
			});
		} else {
			// if there is no exists class name add new class
			const newClass = new Classes({
				className,
				trainerName,
				start,
				finish,
				managerId
			});
			newClass
				.save()
				.then((newClass) => {
					console.log(newClass);
					res.json({
						status: 'success',
						newClass
					});
				})
				.catch((err) => {
					// console.log(err);
					res.json({ status: 'error', errors: err });
				});
		}
	});
};
exports.getClassesList = (req, res) => {
	Classes.find({ managerId: req.params.id }, (err, result) => {
		if (err) {
			console.log('error', err);
			res.json({
				status: 'error',
				error: { msg: 'Something went wrong while getting the data please refresh the page again' }
			});
		} else {
			// console.log('rrr', result);
			res.json({
				status: 'success',
				newClassesData: result
			});
		}
	});
};
exports.newStudent = (req, res) => {};
