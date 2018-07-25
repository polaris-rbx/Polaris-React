import React, { Component } from 'react';

import { Container, Row } from 'mdb';
import GroupsSection from './groups/groupsSection';
import OtherSection from './otherSettings/main';
import EditSection from './editSection/editMain';

import PropTypes from 'prop-types';
import SideBar from './sideBar';

import { getGroupInfo } from '../../util/localStorage';
/*
For when a user has been validated,
and the server exists. Contains the actual options etc.
*/
export default class serverPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.editGroup = this.editGroup.bind(this);


	}
	render () {
		if (this.state.editing) {
			return (
				<Row>
					<SideBar />
					<Container className="col-md-8 pt-1 pb-9">
						<EditSection groupSettings={this.state.editing} info={this.state.info}/>
					</Container>
				</Row>
			);
		} else {
			return (
				<Row>
					<SideBar />
					<Container className="col-md-8 pt-1 pb-9">
						<GroupsSection settings={this.props.settings} editGroup={this.editGroup}/>
						<OtherSection/>
					</Container>
				</Row>
			);
		}

	}
	async editGroup(group) {
		const groupInfo = await getGroupInfo(group.id);
		if (groupInfo.error && !groupInfo.error.redirect) {
			throw new Error(groupInfo.error);
		} else {
			this.setState({editing: group, info: groupInfo});
		}

	}
}
serverPanel.propTypes = {
	settings: PropTypes.object.isRequired
};
