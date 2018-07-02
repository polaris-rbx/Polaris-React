import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ServerPanel from './webpanel/serverPanel';


const propTypes = {
	match: PropTypes.object,
};

export default class WebPanelMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {loading: true, invalid: false};

	}
	componentDidMount() {
		const component = this;
		fetch(`/api/servers/${this.props.match.params.id}`)
			.then(res => res.json())
			.then(function(res){
				if (res.error) component.setState({invalid: true});
				component.setState({settings: res, loading: false});
			});
	}
	render () {
		if (this.state.invalid) {
			return (<div className="card text-white bg-danger mb-3 text-center mt-1 col-md-4 mx-auto">
				<div className="card-header">Invalid Id!</div>
				<div className="card-body">
					<h5 className="card-title">The ID you provided was invalid.</h5>
					<p className="card-text text-white" >Please get the correct server ID, or use the drop down menu.</p>
					<p>This warning page is temp.</p>
				</div>
			</div>);
		} else {
			if (this.state.loading) return <h1>Loading... please wait!</h1>;
			return <ServerPanel settings={this.state.settings}/>;
		}
	}
	validId(id) {
		if (id) return true;
	}
}
WebPanelMenu.propTypes = propTypes;
