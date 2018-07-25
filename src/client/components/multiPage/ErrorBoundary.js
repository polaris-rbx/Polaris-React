/* global Raven */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Fa } from 'mdb';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { error: null };
	}

	componentDidCatch(error, errorInfo) {
		this.setState({ error });
		Raven.captureException(error, { extra: errorInfo });
	}

	render() {
		if (this.state.error) {
			//render fallback UI
			return (
				<div
					className="alert alert-danger" role="alert"
					onClick={() => Raven.lastEventId() && Raven.showReportDialog()}>

					<p>	<Fa icon="exclamation-triangle"/> Sorry! We&#39;ve hit a bump.</p>
					<p>The developer has been notified, but please click on this lovely red message to fill out a report. It&#39;ll help me fix it.</p>
				</div>
			);
		} else {
			//when there's not an error, render children untouched
			return this.props.children;
		}
	}
}
ErrorBoundary.propTypes = {
	children: PropTypes.node
};

export default ErrorBoundary;
