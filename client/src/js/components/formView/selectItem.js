import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';

class SelectItem extends React.Component {
	selectRef = React.createRef();

	handleChange = () => {
		this.validation();
	};

	validation() {
		let node = $(this.selectRef.current);
		let name = this.props.formSetting.name;
		let value = node.val();

		if (!value) {
			node.addClass('is-invalid');
			node.removeClass('is-valid');

			return { value: value, name: name, valid: false };
		} else {
			node.removeClass('is-invalid');
			node.addClass('is-valid');

			return { value: value, name: name, valid: true };
		}
	}

	render() {
		let className = `form-group size-${this.props.formSetting.size}`;
		return (
			<div key={this.props.id} className={className}>
				<label className="form-check-inline-label">
					{this.props.formSetting.label}
				</label>
				<select
					className="custom-select"
					value={this.props.formSetting.value}
					onChange={this.handleChange}
					ref={this.selectRef}
					required
				>
					<option value="">Open this select menu</option>
					<option value="option1">
						{this.props.formSetting.option1}
					</option>
					<option value="option2">
						{this.props.formSetting.option2}
					</option>
					<option value="option3">
						{this.props.formSetting.option3}
					</option>
				</select>
			</div>
		);
	}
}
export default SelectItem;

SelectItem.propTypes = {
	formSetting: PropTypes.object,
	id: PropTypes.number
};
