import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

import FormViewItem from './formViewItem';

// Komponente FormView
// props:
// formSettings (array)
// saveFormData (func)

class FormView extends React.Component {
	formViewRef = React.createRef();
	feedbackViewRef = React.createRef();

	handleSubmit = event => {
		event.preventDefault();
		this.validation();
	};

	// Die validation Methode
	// Es wird geprüft ob alle Felder des Formulars valide sind
	// wenn alle Felder valide sind wird die saveFormData Methode aufgerufen
	validation = index => {
		let self = this;
		let validArray = [];
		let valueArray = [];
		let formDatas = {};

		if (index) {
			self.refs[index].current.validation();
			validArray.push(false);
		} else {
			for (let ref of self.refs) {
				let { valid, value, name } = ref.current.validation();
				validArray.push(valid);
				valueArray.push(value);
				formDatas[name] = value;
			}
		}

		if (
			validArray.every(val => val) &&
			valueArray.every(val => val != '')
		) {
			$(this.formViewRef.current).addClass('invisible');
			$(this.feedbackViewRef.current).removeClass('invisible');

			this.props.saveFormData(formDatas);
		}
	};

	// Die render Methode
	// Hier wird eine Feedback View geladen und ein Formular
	// Die einzelnen Felder (FormViewItem) des Formulars
	// werden über das property formSettings gemappt
	render() {
		let self = this;
		self.refs = [];
		return (
			<React.Fragment>
				<div
					className="feedback-view invisible"
					ref={this.feedbackViewRef}
				>
					<p>Sie haben das Formular erfolgreich abgeschickt!!!</p>
				</div>
				<form className="form-view" ref={this.formViewRef}>
					{this.props.formSettings.map(formSetting => {
						let ref = React.createRef();
						self.refs.push(ref);
						return (
							<FormViewItem
								key={formSetting.id}
								id={formSetting.id}
								formSetting={formSetting}
								ref={ref}
							/>
						);
					})}
					<div className="buttonContainer">
						<button
							type="submit"
							onClick={this.handleSubmit}
							className="btn btn-outline-primary"
						>
							Submit
						</button>
					</div>
				</form>
			</React.Fragment>
		);
	}
}

FormView.propTypes = {
	formSettings: PropTypes.array,
	saveFormData: PropTypes.func
};

export default FormView;
