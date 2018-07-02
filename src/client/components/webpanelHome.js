import React, { Component } from 'react';


import { Container } from '../MDB';
import ServerDropdown from './webpanel/selectServerDropdown.js';

export default class WebPanel extends Component {
	constructor(props) {
		super(props);
	}
	render () {
		return (
			<Container className="col-md-10 pt-1">
				<Container fluid={true} className="border border-dark pb-2">
					<h1 className="text-center"><span className="badge cyan darken-2">New</span> Polaris web panel</h1>
					<hr className="hr-dark"/>

					<h2>Please choose a server...</h2>
					<ServerDropdown/>

				</Container>
			</Container>
		);
	}
}
