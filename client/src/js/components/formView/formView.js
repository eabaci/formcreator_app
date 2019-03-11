import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

import FormViewItem from './formViewItem';

class FormView extends React.Component {
	formViewRef = React.createRef();
	feedbackViewRef = React.createRef();

	handleSubmit = event => {
		event.preventDefault();
		this.validation();
	};

	validation = index => {
		let self = this;
		let validArray = [];

		if (index) {
			self.refs[index].current.validation();
			validArray.push(false);
		} else {
			for (let ref of self.refs) {
				let { valid } = ref.current.validation();
				validArray.push(valid);
			}
		}

		if (validArray.every(val => val)) {
			$(this.formViewRef.current).addClass('invisible');
			$(this.feedbackViewRef.current).removeClass('invisible');

			this.props.saveFormData(this.props.formDatas);
		}
	};

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
								formDatas={this.props.formDatas}
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
	formDatas: PropTypes.object,
	saveFormData: PropTypes.func
};

export default FormView;
