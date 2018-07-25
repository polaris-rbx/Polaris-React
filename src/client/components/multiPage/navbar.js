import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink } from 'mdb';
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
				<Navbar style={style} dark expand="md" fixed="top">
					<NavbarBrand href="/">
						<strong>Polaris</strong>
					</NavbarBrand>
					{ !this.state.isWideEnough && <NavbarToggler onClick={this.onClick } />}
					<Collapse isOpen = { this.state.collapse } navbar>
						<NavbarNav left>
							<NavItem active>
								<NavLink to="/">Home</NavLink>
							</NavItem>
							<NavItem>
								<NavLink to="#">Features</NavLink>
							</NavItem>
							<NavItem>
								<NavLink to="/panel">Web panel</NavLink>
							</NavItem>
							<NavItem>
								<NavLink to="#">Quick links</NavLink>
							</NavItem>
						</NavbarNav>
					</Collapse>
				</Navbar>



			</div>
		);
	}
}

export default FixedNavbar;
