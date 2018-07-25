import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ServerPanel from './webpanel/serverPanel';
import Loader from './multiPage/Loader';

import { apiFetch} from '../util/apiFetch';

const propTypes = {
	match: PropTypes.object,
};

export default class WebPanelMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {loading: true, invalid: false};

	}
	componentDidMount() {
		if (this.props.match.params.id) {
			const component = this;
			apiFetch(`/api/servers/${this.props.match.params.id}`)
				.then(function(res){
					if (res.error) {
						if (res.error.redirect) {
							window.location.href = res.error.redirect;
							return;
						} else {
							component.setState({invalid: true, error: res.error});
						}
					}
					component.setState({settings: res, loading: false});
				});

		}

	}
	render () {
		if (this.state.invalid) {
			return (<div className="card text-white bg-danger mb-3 text-center mt-1 col-md-4 mx-auto">
				<div className="card-header">Invalid Id!</div>
				<div className="card-body">
					<h5 className="card-title">The ID you provided was invalid.</h5>
					<p className="card-text text-white" >Please get the correct server ID, or use the drop down menu. Polaris is not in the server you provided.</p>
					<p>{this.state.error.message}</p>
				</div>
			</div>);
		} else {
			if (this.state.loading) return <Loader/>;
			return <ServerPanel settings={this.state.settings}/>;
		}
	}
	validId(id) {
		if (id) return true;
	}
}
WebPanelMenu.propTypes = propTypes;
