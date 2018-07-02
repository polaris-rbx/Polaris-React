import React, { Component } from 'react';

import { Container } from '../../MDB';
import MainGroupCard from './mainGroupCard';
/*
For when a user has been validated,
and the server exists. Contains the actual options etc.
*/
export default class serverPanel extends Component {
	constructor(props) {
		super(props);
	}
	render () {
		return (
			<div>
				<h1>Hi there. This is where the actual option will appear.</h1>
				<MainGroupCard/>
			</div>
		);
	}
}
