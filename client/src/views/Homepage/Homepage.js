import React from 'react';
import withAuth from '../../components/Auth/withAuth';
import { Link } from 'react-router-dom';

class Homepage extends React.Component {
	render() {
		return (
			<div>
				<h1>Hello from Home page</h1>
				<Link to="/login">LogIn</Link>
				<br />
				<Link to="/register">Register</Link>
			</div>
		);
	}
}
export default withAuth(Homepage);
