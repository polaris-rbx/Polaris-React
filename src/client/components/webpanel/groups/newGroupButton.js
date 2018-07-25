import React from 'react';
import { Button, Fa } from 'mdb';
class NewGroupButton extends React.Component {
	render() {
		return (
			<Button color="default" className="btn-md"><Fa icon="plus"/></Button>
		);
	}
}
export default NewGroupButton;
