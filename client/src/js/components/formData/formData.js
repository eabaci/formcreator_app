import React from 'react';
import PropTypes from 'prop-types';
import FormDataItem from './formDataItem';

// Komponente FormData
// props:
// formSettings (array)

class FormData extends React.Component {
	// Die render Methode
	// Die einzelnen FormData Bereiche (FormDataItem)
	// werden über das property formSettings gemappt
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
