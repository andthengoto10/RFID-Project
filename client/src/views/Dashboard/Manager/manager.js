import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import classes from '../dashboard.module.scss';
import AuthHelperMethods from '../../../components/Auth/AuthHelperMethods';
import withAuth from '../../../components/Auth/withAuth';
const Auth = new AuthHelperMethods();

class Manager extends React.Component {
	state = {
		className: '',
		trainerName: '',
		start: '',
		finish: '',
		classesList: [],
		isNewClassOpen: false,
		isEditSchoolNameOpen: false,
		schoolName: '',
		managerId: '',
		errors: []
	};
	componentDidMount() {
		if (!Auth.loggedIn()) {
			this.props.history.replace('/login');
		} else {
			this.setState({ managerId: this.props.confirm.id });
			axios
				.get(`/getClassesList/${this.props.confirm.id}`)
				.then((res) => {
					// console.log(res);
					if (res.data.status === 'success') {
						this.setState({ classesList: res.data.newClassesData });
					} else {
					}
				})
				.catch((err) => {
					this.setState({ errors: [ { msg: 'There Was a problem with server, Please try again later' } ] });
				});
		}
	}
	updateValue = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	editSchoolNameHandler = () => {
		this.setState({ isEditSchoolNameOpen: !this.state.isEditSchoolNameOpen });
	};
	editSchoolName = (e) => {
		e.preventDefault();
		sessionStorage.setItem('schoolName', this.state.schoolName);
		this.editSchoolNameHandler();
	};
	newClassHandler = () => {
		this.setState({ isNewClassOpen: !this.state.isNewClassOpen });
	};
	addNewClass = (e) => {
		e.preventDefault();
		let obj = {
			className: this.state.className,
			trainerName: this.state.trainerName,
			start: this.state.start,
			finish: this.state.finish,
			managerId: this.state.managerId
		};
		// console.log(obj);
		axios
			.post('/newClass', { ...obj })
			.then((response) => {
				// console.log(response);
				// to hide the form after submit
				this.newClassHandler();
				const newClass = response.data.newClass;
				let classesList = [ ...this.state.classesList ];
				classesList.push(newClass);
				if (response.data.status === 'success') {
					//successful situation
					this.setState({ classesList: classesList });
				} else {
					this.setState({ errors: response.data.errors });
				}
			})
			.catch((err) => {
				this.setState({ errors: [ 'There was a problem with server, Please try again later.' ] });
			});
	};
	render() {
		return (
			<div className={classes.container}>
				<React.Fragment>
					<header>
						<h3>School Management</h3>
						<ul>
							<li className={classes.school} onClick={this.editSchoolNameHandler}>
								<img src={require('../../../assest/Image/school.svg')} alt="school" />
								<div>
									<span>School Name</span>
									{sessionStorage.getItem('schoolName')}
									<img
										className={classes.editSchool}
										src={require('../../../assest/Image/pen-solid.svg')}
										alt="editSchoolName"
									/>
								</div>
							</li>
							<li>
								<img src={require('../../../assest/Image/class.svg')} alt="class" />
								<div>
									<span>Classes</span>
									{this.state.classesList.length}
								</div>
							</li>
							<li className={classes.student}>
								<img src={require('../../../assest/Image/student.svg')} alt="student" />
								<div>
									<span>Students</span>
									243
								</div>
							</li>
						</ul>
					</header>
					<section className={classes.schoolClassContainer}>
						<h3>Classes</h3>
						<button onClick={this.newClassHandler}>New Class</button>
						<ul className={classes.titleList}>
							<li>Name</li>
							<li>Trainer</li>
							<li>Start</li>
							<li>Finish</li>
							<li>Action</li>
							<li>Action</li>
						</ul>
						{this.state.classesList.map((item, key) => (
							<Link
								to={{
									pathname: '/students/' + item.className,
									obj: { ...item }
								}}
								key={key}
							>
								<ul>
									<li>{item.className}</li>
									<li>{item.trainerName}</li>
									<li>{item.start}</li>
									<li>{item.finish}</li>
									<li className={classes.edit}>Edit</li>
									<li className={classes.delete}>Delete</li>
								</ul>
							</Link>
						))}
					</section>
					{this.state.isEditSchoolNameOpen ? (
						<React.Fragment>
							<div className={classes.bgDiv} onClick={this.editSchoolNameHandler} />
							<form className={classes.editSchoolForm} onSubmit={this.editSchoolName}>
								<h1>Enter Your School Name</h1>
								<input
									type="text"
									name="schoolName"
									placeholder="School Name"
									onChange={this.updateValue}
									value={this.state.schoolName}
								/>
								<input type="submit" value="Save" />
							</form>
						</React.Fragment>
					) : null}
					{this.state.isNewClassOpen ? (
						<React.Fragment>
							<div className={classes.bgDiv} onClick={this.newClassHandler} />
							<form className={classes.addClassForm} onSubmit={this.addNewClass}>
								<h1>Add new class</h1>
								<input
									type="text"
									name="className"
									placeholder="Enter Class Name"
									onChange={this.updateValue}
									value={this.state.className}
									required
								/>
								<input
									type="text"
									name="trainerName"
									placeholder="Enter Trainer Name"
									onChange={this.updateValue}
									value={this.state.trainerName}
									required
								/>
								<label>Enter Start Date:</label>
								<input
									type="date"
									name="start"
									onChange={this.updateValue}
									value={this.state.start}
									required
								/>
								<label>Enter Finish Date:</label>
								<input
									type="date"
									name="finish"
									onChange={this.updateValue}
									value={this.state.finish}
									required
								/>
								<input type="submit" value="Save" />
							</form>
						</React.Fragment>
					) : null}
				</React.Fragment>
			</div>
		);
	}
}
export default withAuth(Manager);
