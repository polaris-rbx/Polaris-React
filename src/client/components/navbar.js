import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, Fa, NavLink } from '../MDB';
const style = {
	backgroundColor: "#00695c"
};

class FixedNavbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapse: false,
			isWideEnough: false
		};
		this.onClick = this.onClick.bind(this);
	}

	onClick(){
		this.setState({
			collapse: !this.state.collapse,
		});
	}


	render() {
		return (
			<div>
				<Navbar style={style} dark expand="md">
					<NavbarBrand href="/">
						<strong>Polaris</strong>
					</NavbarBrand>
					{ !this.state.isWideEnough && <NavbarToggler onClick={this.onClick } />}
					<Collapse isOpen = { this.state.collapse } navbar>
						<NavbarNav>
							<NavItem>
								<NavLink href="/">Home</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="#">Features</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/panel">Web panel</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="#">Quick links</NavLink>
							</NavItem>
						</NavbarNav>
						<NavbarNav>
							<NavItem>
								<NavLink to="https://twitter.com/BotPolaris"><Fa icon="twitter"/></NavLink>
							</NavItem>
						</NavbarNav>
					</Collapse>
				</Navbar>



			</div>
		);
	}
}

export default FixedNavbar;
