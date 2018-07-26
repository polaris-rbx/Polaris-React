import React from 'react';
import OtherBar from './otherBar';
import OtherSwitch from './OtherSwitch';

class otherSettingsMain extends React.Component {
	render() {
		return (
			<div>
				<h2>Hey there! This is the other settings section.</h2>
				<OtherSwitch/>
			</div>
		);
	}
}
export default otherSettingsMain;
