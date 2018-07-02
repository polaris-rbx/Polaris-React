import React, { Component } from 'react';
import { Button, Card, CardBody, CardTitle, CardText, Fa } from '../../MDB';

export default class ServerCard extends Component {
	render() {
		return (
			<Card className="z-depth-5">
				<CardBody>
					<CardTitle><Fa icon="cog"/> Server settings</CardTitle>
					<CardText>Change server settings, like the bot prefix and auto-verification.</CardText>
					<Button href="#">Let&apos;s go!</Button>
				</CardBody>
			</Card>
		);
	}
}
