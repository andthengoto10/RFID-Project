import React from 'react';
import axios from 'axios';
import classes from '../Register/Form.module.scss';
import { toast } from 'react-toastify';
import AuthHelperMethods from '../../components/Auth/AuthHelperMethods';
const Auth = new AuthHelperMethods();

export default class School extends React.Component {
	state = {
		schoolName: '',
		street: '',
		postalCode: '',
		city: '',
		managerId: '',
		role: '',
		errors: []
	};
	// This func is to check if user logged or not
	componentDidMount() {
		this.setState({ managerId: this.props.match.params.id });
		axios
			.get(`/getSchool/${this.props.match.params.id}`)
			.then((res) => {
				// console.log(res);
				if (res.data.status === 'hasSchool') {
					this.props.history.replace('/dashboard');
				} else {
				}
			})
			.catch((err) => {
				this.setState({ errors: [ { msg: 'There Was a problem with server, Please try again later' } ] });
			});
	}
	// This func is to get the values from the inputs and save it in state
	updateValue = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	addSchool = (e) => {
		e.preventDefault();
		let obj = {
			schoolName: this.state.schoolName,
			street: this.state.street,
			postalCode: this.state.postalCode,
			city: this.state.city,
			managerId: this.state.managerId
		};

		axios
			.post('/newSchool', { ...obj })
			.then((response) => {
				// console.log(response);
				this.props.history.replace('/dashboard');
				if (response.data.status === 'success') {
					//successful situation
					toast.info(<div>Welcome to Your School</div>);
				} else {
					this.setState({ errors: response.data.errors });
				}
			})
			.catch((err) => {
				this.setState({ errors: [ 'There was a problem with server, Please try again later.' ] });
			});
	};
	render() {
		console.log(this.props);
		console.log(this.state.role);
		return (
			<div className="school-container">
				<div className={classes.containerForm}>
					<h1>Create your school</h1>
					{this.state.errors.map((error, index) => (
						<p className={classes.error} key={index}>
							{error.msg}
						</p>
					))}
					<form onSubmit={this.addSchool}>
						<div>
							<img
								className={classes.inputImg}
								alt="school"
								src={require('../../assest/Image/school1.svg')}
							/>
							<input
								type="text"
								placeholder="Enter School Name"
								name="schoolName"
								onChange={this.updateValue}
								value={this.state.schoolName}
								required
							/>
						</div>
						<div>
							<img
								className={classes.inputImg}
								alt="street"
								src={require('../../assest/Image/map-marked-alt-solid.svg')}
							/>
							<input
								type="text"
								placeholder="Enter Street"
								name="street"
								onChange={this.updateValue}
								value={this.state.street}
								required
							/>
						</div>
						<div>
							<img
								className={classes.inputImg}
								alt="postalCode"
								src={require('../../assest/Image/map-marker-alt-solid.svg')}
							/>
							<input
								type="text"
								placeholder="Enter Post Code"
								name="postalCode"
								onChange={this.updateValue}
								value={this.state.postalCode}
								required
							/>
						</div>
						<div>
							<img
								className={classes.inputImg}
								alt="city"
								src={require('../../assest/Image/city-solid.svg')}
							/>
							<input
								type="text"
								placeholder="Enter City"
								name="city"
								onChange={this.updateValue}
								value={this.state.city}
								required
							/>
						</div>
						<input type="submit" value="Create" />
					</form>
				</div>
			</div>
		);
	}
}
