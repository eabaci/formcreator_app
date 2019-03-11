import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';

class TextAreaItem extends React.Component {
	textareaRef = React.createRef();

	handleChange = event => {
		let value = this.validation();
		this.props.formDatas[event.target.name] = value;
	};

	validation() {
		let node = $(this.textareaRef.current);
		let value = node.val();
		let res = this.props.formSetting.regExp;

		var match = res ? res.match(new RegExp('^/(.*?)/([gimy]*)$')) : false;
		var regExp = match ? new RegExp(match[1], match[2]) : '';

		if (regExp && !regExp.test(value)) {
			node.addClass('is-invalid');
			node.removeClass('is-valid');
		} else {
			node.addClass('is-valid');
			node.removeClass('is-invalid');
		}

		return value;
	}

	render() {
		let className = `form-group size-${this.props.formSetting.size}`;
		return (
			<div key={this.props.id} className={className}>
				<label>{this.props.formSetting.label}</label>
				<textarea
					className="form-control"
					name={this.props.formSetting.name}
					placeholder={this.props.formSetting.placeholder}
					onChange={this.handleChange}
					ref={this.textareaRef}
					required
				/>
				<small className="form-text text-muted">
					{this.props.formSetting.help}
				</small>
			</div>
		);
	}
}

TextAreaItem.propTypes = {
	formSetting: PropTypes.object,
	formDatas: PropTypes.object,
	id: PropTypes.number
};

export default TextAreaItem;
