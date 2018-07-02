import React, { Component } from 'react';
import Switch from './switch';

export default class PanelBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			switched: false
		};
		this.toggleSwitch = this.toggleSwitch.bind(this);
	}
	// Set switched to opposite of old state
	toggleSwitch() {
		this.setState(prevState => {
			return {
				switched: !prevState.switched
			};
		});
	}

	render() {
		return (
			<div>
				<Switch onClick={this.toggleSwitch} state={this.state.switched} enabled = {false}/>
			</div>
		);
	}
}
