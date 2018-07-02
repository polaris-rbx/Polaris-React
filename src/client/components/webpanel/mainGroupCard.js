import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardText, CardTitle, Container, Button } from '../../MDB';


export default class MainGroupCard extends Component {
	constructor(props) {
		super(props);
	}
	render () {
		return (
			<Container className="col-md-10 pt-1">
				<Card className="col-md-6">
					<CardHeader>Main group</CardHeader>
					<CardBody>
						<CardTitle>UK | United Kingdom™</CardTitle>
						<CardText>Card text!</CardText>
						<Button className="float-right">Edit</Button>
					</CardBody>
				</Card>
			</Container>
		);
	}
}
