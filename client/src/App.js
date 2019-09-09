import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './views/Homepage/Homepage';
import Register from './views/Register/Register';
import Login from './views/Login/login';
import School from './views/School/School';
import Dashboard from './views/Dashboard/dashboard';
import Students from './views/Dashboard/Manager/students';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<ToastContainer position="top-right" autoClose={3000} />
				<Switch>
					<Route exact path="/" render={(props) => <Homepage {...props} />} />
					<Route path="/register" render={(props) => <Register {...props} />} />
					<Route path="/login" render={(props) => <Login {...props} />} />
					<Route path="/school/:id" render={(props) => <School {...props} />} />
					<Route path="/dashboard" render={(props) => <Dashboard {...props} />} />
					<Route path="/students/:className" render={(props) => <Students {...props} />} />
				</Switch>
			</React.Fragment>
		);
	}
}
export default App;
