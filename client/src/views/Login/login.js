import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classes from '../Register/Form.module.scss';
import { toast } from 'react-toastify';
import AuthHelperMethods from '../../components/Auth/AuthHelperMethods';

const Auth = new AuthHelperMethods();

export default class Login extends React.Component {
	state = {
		email: '',
		password: '',
		errors: []
	};
	// This func is to check if user logged or not
	componentDidMount() {
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
	userLogged = (e) => {
		e.preventDefault();
		let obj = {
			email: this.state.email,
			password: this.state.password
		};
		if (this.validation(obj)) {
			axios
				.post('/login', { ...obj })
				.then((response) => {
					// console.log(response);

					if (response.data.status === 'success') {
						Auth.setToken(response.data.token);
						if (response.data.role === 'Attendee') {
							this.props.history.replace(`/dashboard/${response.data.name}`);
						} else {
							this.props.history.replace(`/school/${response.data.id}`);
						}
						toast.info(<div>Hello {response.data.name}</div>);
					} else {
						// reset Password Field
						this.setState({ password: '' });
						this.setState({ errors: response.data.errors });
					}
				})
				.catch((err) => {
					this.setState({ errors: [ { msg: 'There Was a problem with server, Please try again later' } ] });
				});
		} else {
			// resetting Password Field
			this.setState({ password: '', confirmPassword: '' });
		}
	};
	validation(obj) {
		let errors = [];
		let isValid = true;
		const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

		if (!emailReg.test(obj.email)) {
			errors.push({ msg: 'Please enter your email address' });
			isValid = false;
		}
		if (obj.password.trim().length < 6) {
			errors.push({ msg: 'Your password should be more than 6 letter' });
			isValid = false;
		}
		this.setState({ errors, failed: true });
		return isValid;
	}
	render() {
		return (
			<div className="login-container">
				<div className={classes.containerForm}>
					<h1>Welcome</h1>
					{this.state.errors.map((error, index) => (
						<p className={classes.error} key={index}>
							{error.msg}
						</p>
					))}
					<form onSubmit={this.userLogged}>
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
								name="password"
								id="inputPassword"
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
						<input type="submit" value="Login" />
					</form>
					<p>
						Create a Account? <Link to="/register">Register</Link>
					</p>
				</div>
			</div>
		);
	}
}
