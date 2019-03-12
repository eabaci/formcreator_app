import React from 'react';
import PropTypes from 'prop-types';

import CheckItem from './checkItem';
import TextareaItem from './textareaItem';
import SelectItem from './selectItem';
import InputItem from './inputItem';

// Komponente FormViewItem
// props:
// formSetting (object)
// id (number)

class FormViewItem extends React.Component {
	ref = React.createRef();

	validation() {
		let { value, name, valid } = this.ref.current.validation();
		return { value: value, name: name, valid: valid };
	}

	// Die formatInputField Methode
	// Hier wird die entsprechende Komponente zum Type
	// gerendert (CheckItem, SelectItem, TextareaItem, InputItem)
	formatInputField(type) {
		if (type == 'radio' || type == 'checkbox') {
			return (
				<CheckItem
					id={this.props.id}
					formSetting={this.props.formSetting}
					ref={this.ref}
				/>
			);
		} else if (type == 'select') {
			return (
				<SelectItem
					id={this.props.id}
					formSetting={this.props.formSetting}
					ref={this.ref}
				/>
			);
		} else if (type == 'textarea') {
			return (
				<TextareaItem
					id={this.props.id}
					formSetting={this.props.formSetting}
					ref={this.ref}
				/>
			);
		} else {
			return (
				<InputItem
					id={this.props.id}
					formSetting={this.props.formSetting}
					ref={this.ref}
				/>
			);
		}
	}

	// Die render Methode
	// Ruft die Methode formInputField auf und übergibt
	// den Type des formSetting Objekts
	render() {
		return this.formatInputField(this.props.formSetting.type);
	}
}

FormViewItem.propTypes = {
	formSetting: PropTypes.object,
	id: PropTypes.number
};

export default FormViewItem;
