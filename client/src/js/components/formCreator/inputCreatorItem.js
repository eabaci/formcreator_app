import React from 'react';
import PropTypes from 'prop-types';

class InputCreatorItem extends React.Component {
	handleChange = () => {
		let name = event.target.name;
		let value = event.target.value;

		this.props.onChange(name, value);
	};
	render() {
		let cn = `form-group row ${this.props.className}`;
		return (
			<div className={cn}>
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
	className: PropTypes.string,
	onChange: PropTypes.func
};
