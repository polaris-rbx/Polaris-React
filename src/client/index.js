/**
 * @file Polaris web source
 * @copyright Josh Muir 2018

 	The contents of this script belong explicitly to "Josh Muir", unless it is explicitly stated otherwise.
	External libraries are the property of their respective owners.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'font-awesome/css/font-awesome.min.css';


Raven.config('https://655dab4235f64421bae085050790fd21@sentry.io/242368').install(); //eslint-disable-line
//  - REMOVED TO DISABLE
if (typeof(Storage) === "undefined") {
	ReactDOM.render(noStorageError, document.getElementById('root'));

} else {
	ReactDOM.render(<App />, document.getElementById('root'));
}


const noStorageError =(
	<div>
		<h1>Oops! Browser does not support session storage.</h1>
		<h2>Please change to a more modern browser, such as Chrome or Firefox.</h2>
		<p>Internet explorer is NOT supported. Sorry about that.</p>
	</div>

);
