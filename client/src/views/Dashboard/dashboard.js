import React from 'react';
import Manager from './Manager/manager';
import Attendee from './Attendee/attendee';
import AuthHelperMethods from '../../components/Auth/AuthHelperMethods';
import withAuth from '../../components/Auth/withAuth';
const Auth = new AuthHelperMethods();

class Dashboard extends React.Component {
	state = {
		role: ''
	};
	UNSAFE_componentWillMount() {
		if (!Auth.loggedIn()) {
			this.props.history.replace('/login');
		} else {
			this.setState({ role: this.props.confirm.role });
		}
	}
	handleLogout = () => {
		Auth.logout();
		this.props.history.replace('/login');
		sessionStorage.removeItem('schoolName');
	};
	renderSwitch() {
		switch (this.state.role) {
			case 'Manager':
				return <Manager history={this.props.history} confirm={this.props.confirm} />;
			default:
				return <Attendee />;
		}
	}
	render() {
		return (
			<React.Fragment>
				{this.renderSwitch(this.state.role)}
				<button onClick={this.handleLogout}>Logout</button>
			</React.Fragment>
		);
	}
}
export default withAuth(Dashboard);
