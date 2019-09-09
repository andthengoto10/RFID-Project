import React from 'react';
import axios from 'axios';
import classes from '../dashboard.module.scss';

class Students extends React.Component {
	state = {
		classData: {},
		className: '',
		studentName: '',
		studentVorName: '',
		matrikelNumber: '',
		studentEmail: '',
		studentPassword: '',
		comingTime: '',
		leavingTime: '',
		role: '',
		observer: '',
		observerAddress: '',
		kundenNummer: '',
		maßnahmeNummer: '',
		isAddNewStudentOpen: false,
		hasObserver: false,
		schoolName: '',
		errors: []
	};
	componentDidMount() {
		// this.setState({ className: JSON.parse(sessionStorage.getItem('data').className) });
		// this.setState({ classData: JSON.parse({ ...sessionStorage.getItem('data') }) });
	}
	hasObserverHandler = () => {
		const checkbox = document.getElementById('toggle');
		if (checkbox.checked === true) {
			this.setState({ hasObserver: true });
		} else {
			this.setState({ hasObserver: false });
		}
		console.log(this.state.hasObserver);
	};
	updateValue = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	newStudentHandler = () => {
		this.setState({ isAddNewStudentOpen: !this.state.isAddNewStudentOpen });
	};
	newStudent = (e) => {
		e.preventDefault();
		let obj = {};

		if (this.state.hasObserver) {
			obj = {
				// 1st step : we have to know the names from Backend side
				className: this.state.className,
				studentName: this.state.studentName,
				studentVorName: this.state.studentVorName,
				matrikelNumber: this.state.matrikelNumber,
				studentEmail: this.state.studentEmail,
				studentPassword: this.state.studentPassword,
				comingTime: this.state.comingTime,
				leavingTime: this.state.leavingTime,
				role: this.state.role,
				observer: this.state.observer,
				observerAddress: this.state.observerAddress,
				kundenNummer: this.state.kundenNummer,
				maßnahmeNummer: this.state.maßnahmeNummer
			};
		} else {
			obj = {
				// 1st step : we have to know the names from Backend side
				className: this.state.className,
				studentName: this.state.studentName,
				studentVorName: this.state.studentVorName,
				matrikelNumber: this.state.matrikelNumber,
				studentEmail: this.state.studentEmail,
				studentPassword: this.state.studentPassword,
				comingTime: this.state.comingTime,
				leavingTime: this.state.leavingTime,
				role: this.state.role
			};
		}

		if (this.validation(obj)) {
			axios
				.post('/newStudent', { ...obj })
				.then((response) => {
					// console.log(response);
					if (response.data.status === 'success') {
						//successful situation
					} else {
						this.setState({ errors: response.data.errors });
						// reset password
					}
				})
				.catch((err) => {
					this.setState({ errors: [ 'There was a problem with server, Please try again later.' ] });
				});
		}
	};
	validation(obj) {
		let errors = [];
		let isValid = true;
		const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
		if (obj.studentName.trim().length < 2) {
			errors.push('Please enter your Full name');
			isValid = false;
		}
		if (!emailReg.test(obj.studentEmail)) {
			errors.push('Please enter your email address');
			isValid = false;
		}
		if (obj.studentPassword.trim().length < 6) {
			errors.push('Your password should be more than 6 letter');
			isValid = false;
		}
		this.setState({ errors });
		return isValid;
	}
	render() {
		sessionStorage.setItem('data', JSON.stringify(this.props.history.location.obj));
		return (
			<div className={classes.container}>
				<header>
					<ul>
						<li className={classes.school}>
							<img src={require('../../../assest/Image/school.svg')} alt="school" />
							<div>
								<span>Class Name</span>
								{this.state.className}
							</div>
						</li>
						<li>
							<img src={require('../../../assest/Image/class.svg')} alt="class" />
							<div>
								<span>Trainer Name</span>
								{/* {JSON.parse(sessionStorage.getItem('data').trainerName)} */}
							</div>
						</li>
						<li className={classes.student}>
							<img src={require('../../../assest/Image/student.svg')} alt="student" />
							<div>
								<span>Students</span>
								3
							</div>
						</li>
					</ul>
				</header>
				<section className={classes.students}>
					<button onClick={this.newStudentHandler}>Add Student</button>
					<h3>Students</h3>
					<ul>
						<li>#</li>
						<li>Name</li>
						<li>Class name</li>
						<li>Observer</li>
						<li>Action</li>
						<li>Action</li>
					</ul>
					<ul>
						<li>01</li>
						<li>Abdul</li>
						<li>First Class</li>
						<li>Job Center</li>
						<li className={classes.edit}>Edit</li>
						<li className={classes.delete}>Delete</li>
					</ul>
				</section>
				{this.state.isAddNewStudentOpen ? (
					<React.Fragment>
						<div className={classes.bgDiv} onClick={this.newStudentHandler} />
						<form className={classes.addStudentForm} onSubmit={this.newStudent}>
							<h1>Add new student</h1>
							{this.state.errors.map((error, index) => (
								<p className={classes.error} key={index}>
									{error}
								</p>
							))}
							<label>Name</label>
							<input
								type="text"
								name="studentName"
								placeholder="Student Name"
								onChange={this.updateValue}
								value={this.state.studentName}
								required
							/>
							<label>Vorname</label>
							<input
								type="text"
								name="studentVorName"
								placeholder="Student Vorname"
								onChange={this.updateValue}
								value={this.state.studentVorName}
								required
							/>
							<label>Email</label>
							<input
								type="email"
								name="studentEmail"
								placeholder="Student Email"
								onChange={this.updateValue}
								value={this.state.studentEmail}
								required
							/>
							<label>Password</label>
							<input
								type="password"
								name="studentPassword"
								placeholder="Student Password"
								onChange={this.updateValue}
								value={this.state.studentPassword}
								required
							/>
							<label>Matrikel Number</label>
							<input
								type="text"
								name="matrikelNumber"
								placeholder="Student Matrikel Number"
								onChange={this.updateValue}
								value={this.state.matrikelNumber}
								required
							/>
							<input type="checkbox" id="toggle" onClick={this.hasObserverHandler} />
							<label htmlFor="toggle" className={classes.toggle}>
								this student has Observer
							</label>
							<input type="submit" value="Save" />
						</form>
					</React.Fragment>
				) : null}
			</div>
		);
	}
}

export default Students;
