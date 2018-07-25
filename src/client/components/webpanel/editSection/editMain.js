import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'mdb';
import GroupIdBox from './groupIdBox';
import RanksCheckBox from './ranksToRoles';
import localStorage from '../../../util/localStorage';
import BindBar from './bindBar';


/*
For editng groups!
Key is supplied to container as it forces constructors to re-run when another edit button is clicked.

*/
export default class EditSection extends Component {
	constructor (p) {
		super(p);
		this.state = {};
	}
	async componentDidMount(){
		const discordRoles = await localStorage.getDiscordRoles();
		if (Array.isArray(discordRoles)) {
			let compArray = [];
			for (let current of discordRoles) {
				compArray.push(<BindBar roleName={current.name} key={current.id}/>);
			}
			this.setState({roleArray: compArray});
		}
	}
	render () {
		return (
			<Container id="edit" key={this.props.groupSettings.id}>
				{this.props.groupSettings ? <h1>Edit group - <small className="text-muted"> {this.props.info.Name}</small></h1> : <h3>Add group</h3>}

				{this.props.groupSettings ? <h4><strong>Group id:</strong> {this.props.groupSettings.id}</h4> :<GroupIdBox id={this.props.groupSettings.id}/>}
				<h4>Ranks to roles</h4>
				<p>Ranks to roles is the simplest way to link your Roblox™ group to your discord. It works on role/rank names. If there is a rank in your group, and a role in your discord with the same names,
				users will be able to claim those roles. For example, if your group has an <code>Owner</code> rank and your discord has an <code>Owner</code> role, if you are ranked <code>Owner</code> you will recieve that role.</p>
				<RanksCheckBox checked={this.props.groupSettings ? this.props.groupSettings.ranksToRoles : false}/>

				<h4 className="mb-0 mt-1">Roles in your discord:</h4>
				<small className="text-muted">Click on one to view which ranks are bound to it.</small>
				{this.state.roleArray}
			</Container>);
	}

}
EditSection.propTypes = {
	info: PropTypes.object,
	groupSettings: PropTypes.object
};
