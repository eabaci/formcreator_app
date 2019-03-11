import React from 'react';
import PropTypes from 'prop-types';
import FormDataItem from './formDataItem';

class FormData extends React.Component {
	render() {
		return (
			<React.Fragment>
				{Object.keys(this.props.formSettings).map(formSetting => (
					<FormDataItem
						key={this.props.formSettings[formSetting].id}
						id={this.props.formSettings[formSetting].id}
						formSetting={this.props.formSettings[formSetting]}
					/>
				))}
			</React.Fragment>
		);
	}
}

FormData.propTypes = {
	formSettings: PropTypes.array
};

export default FormData;
