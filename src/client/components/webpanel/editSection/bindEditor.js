import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import  { Table, Fa, Button } from 'mdb';
import BindRow from './BindRow';
import {editGroup, editMainGroup} from 'settingsManager';

export default class BindEditor extends Component {
	constructor (p) {
		// Will need support for old binds too.
		super(p);
		this.save = this.save.bind(this);
		this.rmvRank = this.rmvRank.bind(this);
		this.cancel = this.cancel.bind(this);
		this.state = {
			rows: [],
			values: []
		};
		// Generate rows
		const tableRows = [];
		if (p.bind) {
			for (var counter=0; counter < p.bind.length; counter++) {
				let current = p.bind[counter];
				tableRows.push(
					<BindRow key={`${counter}-bindRow`} pos={counter} rank={current.rank} exclusive={current.exclusive} groupId={this.props.groupId} save = {this.save} rmv={this.rmvRank}/>
				);
				this.state.values.push({
					rank: current.rank,
					exclusive: current.exclusive,
					role: this.props.roleId
				});
			}

		}
		this.state.rows = tableRows;
		this.addRank = this.addRank.bind(this);
	}

	addRank () {
		if (this.state.rows.length === 0 || this.state.rows[this.state.rows.length - 1].props.rank) {
			// if last ele has a rank prop its real. that means add another!
			let newArr = this.state.rows;
			let bindId= `${Math.floor(Math.random() * 1000)}-NEW`;

			newArr.push(<BindRow key={bindId} groupId={this.props.groupId} save = {this.save} cancel={this.cancel}/>);

			this.setState({ rows: newArr });
		}
	}
	rmvRank (pos) {
		for (var count = 0; count < this.state.rows.length; count++) {
			if (this.state.rows[count].props.pos === pos) {
				this.state.rows.splice(count, 1);
				this.state.values.splice(count, 1);
				this.setState({
					rows: this.state.rows,
					values: this.state.values
				});
				if (this.props.isMain) {
					editMainGroup({binds: this.state.values});
				} else {
					editGroup(this.props.groupId, {binds: this.state.values });
				}
			}
		}
	}
	cancel () {
		this.state.rows.splice(this.state.rows.length - 1, 1);
		this.setState({ rows: this.state.rows });
	}


	save (values) {
		// check dupes
		for (let current of this.state.values) {
			if (values.rank === current.rank && values.exclusive === current.exclusive) {
				alert('You cannot have duplicate binds! There is already a bind with those properties.');
				return; // Stop. Its a duplicate, don't allow
			}
		}
		// Add in role id for settings api
		values.role = this.props.roleId;
		// If this runs its ok

		this.state.values.push(values);

		// Delete editing bind thing
		this.state.rows.splice(this.state.rows.length - 1, 1);
		// Replace with real one:
		this.state.rows.push(
			<BindRow key={`${this.state.rows.length}-bindRow`} pos={this.state.rows.length} rank={values.rank} exclusive={values.exclusive} groupId={this.props.groupId} save = {this.save} rmv={this.rmvRank}/>);

		if (this.props.isMain) {
			editMainGroup({binds: this.state.values});
		} else {
			editGroup(this.props.groupId, {binds: this.state.values });
		}
		this.setState({values: this.state.values, rows: this.state.rows});
	}


	render () {
		return (
			<Fragment>
				<h2>Ranks  <small><Button onClick = {this.addRank} outline size="sm"><Fa icon="plus" aria-hidden="true"/></Button></small></h2>
				<Table>
					<thead>
						<tr>
							<th>Rank id</th>
							<th style={{width: "30%"}}>Rank name</th>
							<th style={{width: "30%"}}>Exclusive?</th>
							<th>Options</th>
						</tr>
					</thead>

					<tbody>
						{this.state.rows ? this.state.rows : null}


					</tbody>
				</Table>
			</Fragment>

		);
	}

}
BindEditor.propTypes = {
	bind: PropTypes.array,
	groupId: PropTypes.number,
	isMain: PropTypes.bool,
	roleId: PropTypes.string
};
