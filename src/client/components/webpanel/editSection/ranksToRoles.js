import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Switch from '../switch';
/*
For editng groups ids
*/

export default class ranksCheckBox extends Component {
	constructor(props) {
		super(props);
		this.state = { value: props.checked };
		this.onClick = this.onClick.bind(this);

	}
	onClick () {
		this.setState({value: !this.state.value});
	}
	render () {
		return (
			<Switch onClick={this.onClick} state={this.state.value}/>



		);
	}

}
ranksCheckBox.propTypes = {
	checked: PropTypes.bool.isRequired
};
