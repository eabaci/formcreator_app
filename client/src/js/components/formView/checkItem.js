import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';

class CheckItem extends React.Component {
	option1Ref = React.createRef();
	option2Ref = React.createRef();
	option3Ref = React.createRef();

	handleChange = () => {
		let value = this.validation();
		let name = this.props.formSetting.name;
		this.props.formDatas[name] = value;
	};

	validation() {
		let op1Node = $(this.option1Ref.current);
		let op2Node = $(this.option2Ref.current);
		let op3Node = $(this.option3Ref.current);

		let op1 = op1Node[0].checked;
		let op2 = op2Node[0].checked;
		let op3 = op3Node[0].checked;
		let value = {};
		if (op1) value['option1'] = op1;
		if (op2) value['option2'] = op2;
		if (op3) value['option3'] = op3;

		if (value && !value.option1 && !value.option2 && !value.option3) {
			op1Node.addClass('is-invalid');
			op2Node.addClass('is-invalid');
			op3Node.addClass('is-invalid');
		} else {
			op1Node.removeClass('is-invalid');
			op2Node.removeClass('is-invalid');
			op3Node.removeClass('is-invalid');
		}
		return value;
	}

	render() {
		let className = `form-group size-${this.props.formSetting.size}`;
		return (
			<div key={this.props.id} className={className}>
				<label className="form-check-inline-label">
					{this.props.formSetting.label}
				</label>
				<div className="form-check form-check-inline">
					<input
						className="form-check-input"
						type={this.props.formSetting.type}
						name={this.props.formSetting.name}
						ref={this.option1Ref}
						onChange={this.handleChange}
						required
					/>
					<label className="form-check-label">
						{this.props.formSetting.option1}
					</label>
				</div>
				<div className="form-check form-check-inline">
					<input
						className="form-check-input"
						type={this.props.formSetting.type}
						name={this.props.formSetting.name}
						ref={this.option2Ref}
						onChange={this.handleChange}
						required
					/>
					<label className="form-check-label">
						{this.props.formSetting.option2}
					</label>
				</div>
				<div className="form-check form-check-inline">
					<input
						className="form-check-input"
						type={this.props.formSetting.type}
						name={this.props.formSetting.name}
						ref={this.option3Ref}
						onChange={this.handleChange}
						required
					/>
					<label className="form-check-label">
						{this.props.formSetting.option3}
					</label>
				</div>
			</div>
		);
	}
}
export default CheckItem;

CheckItem.propTypes = {
	formSetting: PropTypes.object,
	formDatas: PropTypes.object,
	id: PropTypes.number
};
