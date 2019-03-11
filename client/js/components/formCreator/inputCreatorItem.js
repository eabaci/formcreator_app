import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';

class InputCreatorItem extends React.Component {
	constructor() {
		super();

		this.handleChange = this.handleChange.bind(this);

		this.inputRef = React.createRef();
	}
	handleChange() {
		let name = event.target.name;
		let value = event.target.value;

		this.props.onChange(name, value);
	}
	hide() {
		let node = this.inputRef.current;
		$(node).removeClass('invisible');
	}
	show() {
		let node = this.inputRef.current;
		$(node).addClass('invisible');
	}
	render() {
		return (
			<div className="form-group row" ref={this.inputRef}>
				<label className="col-sm-4 col-form-label">
					{this.props.label}
				</label>
				<div className="col-sm-8">
					<input
						type="text"
						className="form-control"
						name={this.props.name}
						value={this.props.value || ''}
						onChange={this.handleChange}
					/>
				</div>
			</div>
		);
	}
}

export default InputCreatorItem;

InputCreatorItem.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func
};
