import React, { Component } from 'react';
import './app.css';

import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import mainArea from './components/mainArea';

import NavBar from './components/navbar';
import Footer from './components/footer';

import WebPanelHome from './components/webpanelHome';
import WebPanelMenu from './components/webpanelMenu';

import NoMatch from './components/NoMatch';

export default class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<NavBar/>
				<Router>
					<Switch>
						<Route exact path="/" component={mainArea}/>
						<Route exact path="/panel" component={WebPanelHome}/>
						<Route exact path="/panel/:id" component={WebPanelMenu}/>
						<Route component={NoMatch}/>
					</Switch>
				</Router>
				<Footer/>
			</div>);
	}
}
