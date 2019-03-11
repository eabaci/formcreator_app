import React from 'react';
import PropsType from 'prop-types';
import $ from 'jquery';
import _ from 'lodash';

class FormDataItem extends React.Component {
	constructor() {
		super();

		this.toggleItem = this.toggleItem.bind(this);

		this.labelRef = React.createRef();
		this.textareaRef = React.createRef();
	}

	toggleItem() {
		let formNode = $(this.textareaRef.current);
		let labelNode = $(this.labelRef.current);
		if (formNode.hasClass('invisible')) {
			labelNode.addClass('invisible');
			formNode.removeClass('invisible');
		} else if (labelNode.hasClass('invisible')) {
			formNode.addClass('invisible');
			labelNode.removeClass('invisible');
		}
	}

	render() {
		return (
			<div className="form-wrapper">
				<h2 ref={this.labelRef} onClick={this.toggleItem}>
					{this.props.formSetting.name}
				</h2>
				<div ref={this.textareaRef} className="invisible">
					<textarea
						disabled
						rows="10"
						cols="30"
						value={JSON.stringify(
							_.pick(this.props.formSetting, [
								'id',
								'name',
								'label',
								'placeholder',
								'help',
								'regExp',
								'type',
								'size',
								'option1',
								'option2',
								'option3'
							]),
							null,
							'\t'
						)}
					/>
					<button
						className="btn btn-outline-primary"
						onClick={this.toggleItem}
					>
						Close Item
					</button>
				</div>
			</div>
		);
	}
}

FormDataItem.propTypes = {
	formSetting: PropsType.object
};

export default FormDataItem;
