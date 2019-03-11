import React from 'react';
import PropTypes from 'prop-types';
import FormDataItem from './formDataItem';

class FormData extends React.Component {
	render() {
		return (
			<React.Fragment>
				{this.props.formSettings.map(formSetting => (
					<FormDataItem
						key={formSetting.id}
						id={formSetting.id}
						formSetting={formSetting}
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
