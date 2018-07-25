import React, { Component } from 'react';
import '../css/atom-loader.css';

import { Container } from 'mdb';
import ServerDropdown from './webpanel/selectServerDropdown.js';

import Loader from './multiPage/Loader';

import { apiFetch, getCookie } from '../util/apiFetch';

export default class WebPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {loading: true, authorised: false};

	}

	componentDidMount(){
		const component = this;
		const authCookie = getCookie('auth');
		if (!authCookie) {
			this.setState({authorised: false, loading: false});
			return null;
		}
		apiFetch('/api/servers')
			.then(function(json){
				console.log(json);
				component.setState({authorised: true, servers: json, loading: false});
			});

	}
	render () {
		if (this.state.loading) {
			return (
				<Loader/>
			);

		}
		if (this.state.authorised) {
			return (

				<Container className="col-md-10 pt-1">
					<Container fluid={true} className="border border-dark pb-2">
						<h1 className="text-center"><span className="badge cyan darken-2">New</span> Polaris web panel</h1>
						<hr className="hr-dark"/>

						<h2>Please choose a server...</h2>
						<ServerDropdown servers={this.state.servers}/>

					</Container>
				</Container>
			);

		} else {
			return (
				<Container className="col-md-10 pt-1">
					<Container fluid={true} className="border border-dark pb-2">
						<h1 className="text-center"><span className="badge cyan darken-2">New</span> Polaris web panel</h1>
						<hr className="hr-dark"/>
						<div className="discord-container">
							<a href="/api/discord/login">Login through discord</a>
						</div>


					</Container>
				</Container>
			);

		}

	}
}
