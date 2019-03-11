import React from 'react';
import PropTypes from 'prop-types';

class SelectCreatorItem extends React.Component {
	constructor() {
		super();

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		let name = event.target.name;
		let value = event.target.value;

		this.props.onChange(name, value);
	}

	render() {
		return (
			<div className="form-group row">
				<label className="col-sm-4 col-form-label">
					{this.props.label}
				</label>
				<div className="col-sm-8">
					<select
						name={this.props.name}
						className="form-control"
						value={this.props.value}
						onChange={this.handleChange}
					>
						{Object.keys(this.props.options).map(op => (
							<option key={op} value={op}>
								{this.props.options[op]}
							</option>
						))}
					</select>
				</div>
			</div>
		);
	}
}

export default SelectCreatorItem;

SelectCreatorItem.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	options: PropTypes.object,
	onChange: PropTypes.func
};
