import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
For editng groups ids
*/
export default class GroupIdBox extends Component {
	constructor(props) {
		super(props);
		this.state = { value: ""+props.id };
		this.handleChange = this.handleChange.bind(this);

	}
	handleChange(event) {
		if (isNum(event.target.value)) {
			this.setState({value: event.target.value, invalid: false});
		} else {
			this.setState({invalid: true});
		}
	}
	render () {
		console.log(`Render: ${this.state.value}`);
		return (
			<div>
				<label className="mt-2"  htmlFor="groupIdBox">Group id: </label>
				<input type="text" id="groupIdBox" className="form-control" value={this.state.value} onChange={this.handleChange} />

				{this.state.invalid ? <small id="passwordHelpBlockMD" className="form-text text-danger mt-0">Group id must be a number. Non-number characters will not be accepted. </small> : null}

			</div>
		);
	}

}
GroupIdBox.propTypes = {
	id: PropTypes.number.isRequired
};

function isNum(num){
	return !isNaN(num);
}
