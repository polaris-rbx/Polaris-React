import React from "react";
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from "mdb";

class ModalPage extends React.Component {
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

	render() {
		return (
			<Container>
				<h4 className="mt-4">Basic example</h4>
				<Button color="danger" onClick={this.toggle} >Modal</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
					<ModalBody>
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</ModalBody>
					<ModalFooter>
						<Button color="secondary" onClick={this.toggle}>Close</Button>{"  "}
						<Button color="primary">Save changes</Button>
					</ModalFooter>
				</Modal>
			</Container>
		);
	}
}

export default ModalPage;
