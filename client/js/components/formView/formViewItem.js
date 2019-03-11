import React from 'react';
import PropTypes from 'prop-types';

import CheckItem from './checkItem';
import TextareaItem from './textareaItem';
import SelectItem from './selectItem';
import InputItem from './inputItem';

class FormViewItem extends React.Component {
	ref = React.createRef();

	validation() {
		this.ref.current.validation();
	}

	formatInputField(type) {
		if (type == 'radio' || type == 'checkbox') {
			return (
				<CheckItem
					id={this.props.id}
					formSetting={this.props.formSetting}
					formDatas={this.props.formDatas}
					ref={this.ref}
				/>
			);
		} else if (type == 'select') {
			return (
				<SelectItem
					id={this.props.id}
					formSetting={this.props.formSetting}
					formDatas={this.props.formDatas}
					ref={this.ref}
				/>
			);
		} else if (type == 'textarea') {
			return (
				<TextareaItem
					id={this.props.id}
					formSetting={this.props.formSetting}
					formDatas={this.props.formDatas}
					ref={this.ref}
				/>
			);
		} else {
			return (
				<InputItem
					id={this.props.id}
					formSetting={this.props.formSetting}
					formDatas={this.props.formDatas}
					ref={this.ref}
				/>
			);
		}
	}
	render() {
		return this.formatInputField(this.props.formSetting.type);
	}
}

FormViewItem.propTypes = {
	formSetting: PropTypes.object,
	formDatas: PropTypes.object,
	id: PropTypes.number
};

export default FormViewItem;
