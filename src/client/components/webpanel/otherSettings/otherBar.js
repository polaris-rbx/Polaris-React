import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody} from 'mdb';

export default class OtherBar extends Component {
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
				<Card className="mb-1">
					<CardBody>
						<div className="row">
							<h4 className="col-md-2">{this.props.name}</h4>
							<small className="text-muted col-md-4">{this.props.text}</small>
							<div className="align-middle col-md-2 float-right">
								{this.props.children}
							</div>
						</div>
					</CardBody>
				</Card>

			</div>
		);
	}

}
OtherBar.propTypes = {
	name: PropTypes.string.isRequired,
	text: PropTypes.string,
	children: PropTypes.node,
};
