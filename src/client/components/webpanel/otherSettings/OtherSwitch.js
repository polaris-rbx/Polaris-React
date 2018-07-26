import React from 'react';
import OtherBar from './otherBar';
import Switch from '../switch';
import PropTypes from 'prop-types';

class OtherSwitch extends React.Component {
	constructor (p) {
		super(p);
		this.state = { value: this.props.value || false };
		this.toggle = this.toggle.bind(this);
	}
	toggle () {
		this.setState({
			value: !this.state.value
		});
	}
	render() {
		return (
			<OtherBar name="Auto verification" text="If enabled, users will recieve their roles as soon as they join the server. Requires a linked account.">
				<Switch state = {this.state.value} onClick={this.toggle}/>
			</OtherBar>


		);
	}
}
export default OtherSwitch;
OtherSwitch.propTypes = {
	value: PropTypes.bool
};
