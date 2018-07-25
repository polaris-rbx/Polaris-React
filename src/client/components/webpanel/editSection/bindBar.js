import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Fa } from 'mdb';
import BindModal from './bindModal';

/*
For editng groups!
Key is supplied to container as it forces constructors to re-run when another edit button is clicked.

*/

export default class BindBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false
		};
		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	render () {
		return (
			<div>
				<Card className="mb-1" onClick={this.toggle}>
					<CardBody>
						{this.props.roleName}
						<Fa icon="angle-right" className="float-right"/>
					</CardBody>
				</Card>
				<BindModal roleName={this.props.roleName}  toggle = {this.toggle} modal = {this.state.modal}/>
			</div>
		);
	}

}
BindBar.propTypes = {
	roleName: PropTypes.string.isRequired
};
