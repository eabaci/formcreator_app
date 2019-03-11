import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';

class InputItem extends React.Component {
	inputRef = React.createRef();

	validation() {
		let node = $(this.inputRef.current);
		let value = node.val();
		let res = this.props.formSetting.regExp;
		var ma = res ? res.match(new RegExp('^/(.*?)/([gimy]*)$')) : false;
		var regExp = ma && ma[1] && ma[2] ? new RegExp(ma[1], ma[2]) : '';

		if (regExp && !regExp.test(value)) {
			node.addClass('is-invalid');
			node.removeClass('is-valid');

			return { value: value, valid: false };
		} else {
			node.addClass('is-valid');
			node.removeClass('is-invalid');

			return { value: value, valid: true };
		}
	}

	handleChange = event => {
		let { value } = this.validation();
		this.props.formDatas[event.target.name] = value;
	};

	render() {
		let className = `form-group size-${this.props.formSetting.size}`;
		return (
			<div key={this.props.id} className={className}>
				<label>{this.props.formSetting.label}</label>
				<input
					type={this.props.formSetting.type}
					className="form-control"
					name={this.props.formSetting.name}
					placeholder={this.props.formSetting.placeholder}
					onChange={this.handleChange}
					ref={this.inputRef}
				/>
				<small className="form-text text-muted">
					{this.props.formSetting.help}
				</small>
			</div>
		);
	}
}

InputItem.propTypes = {
	formSetting: PropTypes.object,
	formDatas: PropTypes.object,
	id: PropTypes.number
};

export default InputItem;
