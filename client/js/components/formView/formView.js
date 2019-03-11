import React from 'react';
import PropTypes from 'prop-types';

import FormViewItem from './formViewItem';

class FormView extends React.Component {
	handleSubmit = event => {
		event.preventDefault();
		this.props.saveFormData(this.props.formDatas);
	};

	validation = index => {
		let self = this;

		if (index) {
			self.refs[index].current.validation();
		} else {
			for (let ref of self.refs) ref.current.validation();
		}
	};

	render() {
		let self = this;
		self.refs = [];
		return (
			<form className="formView" ref={this.test}>
				{Object.keys(this.props.formSettings).map(formSetting => {
					let ref = React.createRef();
					self.refs.push(ref);
					return (
						<FormViewItem
							key={this.props.formSettings[formSetting].id}
							id={this.props.formSettings[formSetting].id}
							formSetting={this.props.formSettings[formSetting]}
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
		);
	}
}

FormView.propTypes = {
	formSettings: PropTypes.array,
	formDatas: PropTypes.object,
	saveFormData: PropTypes.func
};

export default FormView;
