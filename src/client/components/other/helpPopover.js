import React from 'react';
import PropTypes from 'prop-types';
import { Popover, PopoverBody, PopoverHeader, Fa } from 'mdb';

class HelpPopover extends React.Component {
	render() {
		const {
			targetProps
		} = this.props;
		return (

			<Popover
				component="button"
				placement="top"
				popoverBody="?"
				className="rounded-circle elegant-color-dark">

				{this.props.header ? <PopoverHeader>{this.props.header}</PopoverHeader> : null}
				{this.props.body ? <PopoverBody>{this.props.body}</PopoverBody> : null}
			</Popover>

		);
	}
}
export default HelpPopover;
HelpPopover.propTypes = {
	header: PropTypes.string,
	body: PropTypes.string
};
