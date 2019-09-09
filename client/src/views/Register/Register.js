import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import classes from './Form.module.scss';
import { toast } from 'react-toastify';
import AuthHelperMethods from '../../components/Auth/AuthHelperMethods';
const Auth = new AuthHelperMethods();

export default class Register extends React.Component {
	state = {
		name: '',
		email: '',
		password: '',
		role: 'Manager',
		errors: []
	};
	// This func is to check if user logged or not
	UNSAFE_componentWillMount() {
		if (Auth.loggedIn()) this.props.history.replace('/dashboard');
	}
	// This func is to get the values from the inputs and save it in state
	updateValue = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	passwordHandler = () => {
		const showEye = document.getElementById('showPassword');
		const hideEye = document.getElementById('hidePassword');
		const inputPassword = document.getElementById('inputPassword');

		if (inputPassword.type === 'password') {
			inputPassword.type = 'text';
			showEye.style.display = 'none';
			hideEye.style.display = 'block';
		} else {
			inputPassword.type = 'password';
			showEye.style.display = 'block';
			hideEye.style.display = 'none';
		}
	};
	addNewUser = (e) => {
		e.preventDefault();
		let obj = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			role: this.state.role
		};

		if (this.validation(obj)) {
			axios
				.post('/register', { ...obj })
				.then((response) => {
					// console.log(response);
					this.props.history.replace('/login');
					if (response.data.status === 'success') {
						//successful situation
						toast.info(<div>Thank you for register</div>);
					} else {
						this.setState({ errors: response.data.errors });
						// reset password
						this.setState({ password: '' });
					}
				})
				.catch((err) => {
					this.setState({ errors: [ 'There was a problem with server, Please try again later.' ] });
				});
		} else {
			// resetting Password Field
			this.setState({ password: '' });
		}
	};
	validation(obj) {
		let errors = [];
		let isValid = true;
		const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
		if (obj.name.trim().length < 2) {
			errors.push('Please enter your Full name');
			isValid = false;
		}
		if (!emailReg.test(obj.email)) {
			errors.push('Please enter your email address');
			isValid = false;
		}
		if (obj.password.trim().length < 6) {
			errors.push('Your password should be more than 6 letter');
			isValid = false;
		}
		this.setState({ errors });
		return isValid;
	}
	render() {
		return (
			<div className="register-container">
				<div className={classes.containerForm}>
					<h1>{this.props.role} Register</h1>
					{this.state.errors.map((error, index) => (
						<p className={classes.error} key={index}>
							{error}
						</p>
					))}
					<form onSubmit={this.addNewUser}>
						<div>
							<img className={classes.inputImg} alt="name" src={require('../../assest/Image/name.svg')} />
							<input
								type="text"
								placeholder="Enter Name"
								name="name"
								onChange={this.updateValue}
								value={this.state.name}
							/>
						</div>
						<div>
							<img
								className={classes.inputImg}
								alt="email"
								src={require('../../assest/Image/email-img.svg')}
							/>
							<input
								type="text"
								placeholder="Enter Email"
								name="email"
								onChange={this.updateValue}
								value={this.state.email}
							/>
						</div>
						<div>
							<img
								className={classes.inputImg}
								alt="password"
								src={require('../../assest/Image/password.svg')}
							/>
							<input
								type="password"
								placeholder="Create Password"
								id="inputPassword"
								name="password"
								onChange={this.updateValue}
								value={this.state.password}
							/>
							<img
								className={classes.eye}
								id="showPassword"
								alt="showPassword"
								src={require('../../assest/Image/eye-slash-solid.svg')}
								onClick={this.passwordHandler}
							/>
							<img
								className={classes.eye}
								id="hidePassword"
								alt="hidePassword"
								src={require('../../assest/Image/eye-solid.svg')}
								onClick={this.passwordHandler}
							/>
						</div>
						<input type="submit" value="Register" />
					</form>
					<p>
						Already have an account <Link to="/login">Login</Link>
					</p>
				</div>
			</div>
		);
	}
}
