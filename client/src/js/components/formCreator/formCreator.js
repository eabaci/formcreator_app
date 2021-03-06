import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import FormCreatorItem from './formCreatorItem';

// Komponente FormCreator
// props:
// formSettings (array)
// addFormSetting (func)
// changeFormSetting (func)
// deleteFormSetting (func)

class FormCreator extends React.Component {
	inputRef = React.createRef();

	// Die validation Methode
	// Der name wird geprüft. Name darf nicht leer sein
	// und muss einmalig sein
	validation(name) {
		if (name) {
			let elem = _.findKey(this.props.formSettings, function(fs) {
				return fs && fs.name == name;
			});
			if (!elem) return true;
			else
				console.log(
					'Validation Error: The Name of the Form Item already exist. Please add a new Name!'
				);
		} else
			console.log(
				'Validation Error: The Name of the Form Item can not be empty. Please add a Name!'
			);
	}

	// Die add Methode
	// Hier wir ein neuer FormCreator hinzugefügt
	// zunächst wird der name geprüft
	add = () => {
		let name = this.inputRef.current.value;
		if (this.validation(name)) this.props.addFormSetting(name);
	};

	// Die render Methode
	// Die einzelnen FormCreator Bereiche (FormCreatorItem)
	// werden über das property formSettings gemappt
	// Am Ende wird die Add FormCreator View gerendert
	render() {
		return (
			<React.Fragment>
				{this.props.formSettings.map(formSetting => (
					<FormCreatorItem
						key={formSetting.id}
						id={formSetting.id}
						formSetting={formSetting}
						changeFormSetting={this.props.changeFormSetting}
						deleteFormSetting={this.props.deleteFormSetting}
					/>
				))}
				<div className="form-wrapper">
					<div className="form-group row">
						<label className="col-sm-4 col-form-label">Name:</label>
						<div className="col-sm-8">
							<input
								type="text"
								className="form-control"
								name="name"
								ref={this.inputRef}
								onChange={this.handleChange}
							/>
						</div>
					</div>
					<button
						className="btn btn-outline-success"
						onClick={this.add}
					>
						Add Form Item
					</button>
				</div>
			</React.Fragment>
		);
	}
}

FormCreator.propTypes = {
	addFormSetting: PropTypes.func,
	changeFormSetting: PropTypes.func,
	deleteFormSetting: PropTypes.func,
	formSettings: PropTypes.array
};

export default FormCreator;
