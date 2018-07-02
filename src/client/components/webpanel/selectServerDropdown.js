import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from '../../MDB';

export default class ServerDropdown extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			dropdownOpen: false,
		};
	}
	toggle() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		});
	}
	render() {// This will be auto-generated using User details
		return (
			<Dropdown isOpen = { this.state.dropdownOpen } toggle = { this.toggle }>
				<DropdownToggle caret color="default">
            Select server
				</DropdownToggle>
				<DropdownMenu>
					<DropdownItem href="/panel/1">Server 1</DropdownItem>
					<DropdownItem href="2">Server 2</DropdownItem>
					<DropdownItem href="3">Server 3</DropdownItem>
					<DropdownItem href="4">Server 4</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		);
	}
}
