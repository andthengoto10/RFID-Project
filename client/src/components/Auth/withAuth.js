import React, { Component } from 'react';
import AuthHelperMethods from './AuthHelperMethods';

/* A higher order component is frequently written as a function that returns a class. */
export default function withAuth(AuthComponent) {
	const Auth = new AuthHelperMethods();

	return class AuthWrapped extends Component {
		state = {
			confirm: null,
			loaded: false
		};

		/* In the componentDid<ount, we would want to do a couple of important tasks in order to verify the current users authentication status prior to granting them enterance into the app. */
		UNSAFE_componentWillMount() {
			if (!Auth.loggedIn()) {
				this.props.history.replace('/');
			} else {
				/* Try to get confirmation message from the Auth helper. */
				try {
					const confirm = Auth.getConfirm();
					// console.log('confirmation is:', confirm);
					this.setState({
						confirm: confirm,
						loaded: true
					});
				} catch (err) {
					/* Oh snap! Looks like there's an error so we'll print it out and log the user out for security reasons. */
					console.log(err);
					Auth.logout();
					// this.props.history.replace('/login');
				}
			}
		}
		render() {
			let element = <AuthComponent history={this.props.history} />;
			if (this.state.loaded === true) {
				if (this.state.confirm) {
					// console.log('confirmed!');
					element = <AuthComponent history={this.props.history} confirm={this.state.confirm} />;
				}
			}
			return element;
		}
	};
}
