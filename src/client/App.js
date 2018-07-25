import React, { Component } from 'react';
import './app.css';

import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import mainArea from './components/mainArea';

import NavBar from './components/multiPage/navbar';
import Footer from './components/multiPage/footer';

import PanelValidation from './components/panelValidation';
import SelectServer from './components/selectServer';

import NoMatch from './components/multiPage/NoMatch';
import Alert from './components/multiPage/alert';
import ErrorBoundary from './components/multiPage/ErrorBoundary';

export default class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Router>
				<div>
					<NavBar/>
					<div className="m-t pt-1">
						<ErrorBoundary>
							<Alert/>

							<Switch>

								<Route exact path="/" component={mainArea}/>
								<Route exact path="/panel" component={SelectServer}/>
								<Route exact path="/panel/:id" component={PanelValidation}/>
								<Route component={NoMatch}/>
							</Switch>

							<Footer/>
						</ErrorBoundary>
					</div>
				</div>
			</Router>
		);
	}
}
