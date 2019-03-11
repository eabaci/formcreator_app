import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import InputCreatorItem from './inputCreatorItem';
import SelectCreatorItem from './selectCreatorItem';

class formSetting extends React.Component {
	constructor() {
		super();

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.delete = this.delete.bind(this);
		this.toggleItem = this.toggleItem.bind(this);

		this.labelRef = React.createRef();
		this.formRef = React.createRef();
		this.placeholderRef = React.createRef();
		this.helpRef = React.createRef();
		this.regExpRef = React.createRef();
		this.option1Ref = React.createRef();
		this.option2Ref = React.createRef();
		this.option3Ref = React.createRef();
	}

	componentDidMount() {
		this.formSetting = this.props.formSetting || {};
		this.formSetting['id'] = this.props.id;

		this.handleTypeChange(this.formSetting.type);
	}

	handleChange(name, value) {
		this.formSetting[name] = value;

		this.props.changeFormSetting(this.formSetting, this.props.id, name);
		if (name == 'type') this.handleTypeChange(value);
	}

	handleTypeChange(type) {
		const node1 = this.option1Ref.current;
		const node2 = this.option2Ref.current;
		const node3 = this.option3Ref.current;
		const node4 = this.placeholderRef.current;
		const node5 = this.helpRef.current;
		const node6 = this.regExpRef.current;
		if (type === 'radio' || type === 'checkbox' || type === 'select') {
			node1.hide();
			node2.hide();
			node3.hide();
			node4.show();
			node5.show();
			node6.show();
		} else {
			node1.show();
			node2.show();
			node3.show();
			node4.hide();
			node5.hide();
			node6.hide();
		}
	}

	handleSubmit(event) {
		event.preventDefault();
	}

	delete() {
		this.props.deleteFormSetting(this.props.id);
	}

	toggleItem() {
		let formNode = $(this.formRef.current);
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
		let typeOptions = {
			radio: 'Radio',
			checkbox: 'Checkbox',
			text: 'Input',
			textarea: 'Textarea',
			select: 'Select'
		};
		let sizeOptions = {
			tiny: 'Tiny',
			small: 'Small',
			medium: 'Medium',
			large: 'Large'
		};
		let regExp = this.props.formSetting.regExp;
		let regExpString = regExp ? regExp.toString() : '';
		return (
			<div className="form-wrapper">
				<h2 ref={this.labelRef} onClick={this.toggleItem}>
					{this.props.formSetting.name}
				</h2>
				<form
					key={this.props.id}
					className="invisible"
					onSubmit={this.handleSubmit}
					ref={this.formRef}
				>
					<InputCreatorItem
						name={'label'}
						value={this.props.formSetting.label}
						label={'Label:'}
						onChange={this.handleChange}
					/>
					<InputCreatorItem
						name={'placeholder'}
						value={this.props.formSetting.placeholder}
						label={'Placeholder:'}
						onChange={this.handleChange}
						ref={this.placeholderRef}
					/>
					<InputCreatorItem
						name={'help'}
						value={this.props.formSetting.help}
						label={'Help:'}
						onChange={this.handleChange}
						ref={this.helpRef}
					/>
					<InputCreatorItem
						name={'regExp'}
						value={regExpString}
						label={'RegExp:'}
						onChange={this.handleChange}
						ref={this.regExpRef}
					/>
					<SelectCreatorItem
						label={'Type:'}
						name={'type'}
						value={this.props.formSetting.type}
						onChange={this.handleChange}
						options={typeOptions}
					/>
					<InputCreatorItem
						name={'option1'}
						value={this.props.formSetting.option1}
						label={'Option 1:'}
						onChange={this.handleChange}
						ref={this.option1Ref}
					/>
					<InputCreatorItem
						name={'option2'}
						value={this.props.formSetting.option2}
						label={'Option 2:'}
						onChange={this.handleChange}
						ref={this.option2Ref}
					/>
					<InputCreatorItem
						name={'option3'}
						value={this.props.formSetting.option3}
						label={'Option 3:'}
						onChange={this.handleChange}
						ref={this.option3Ref}
					/>
					<SelectCreatorItem
						label={'Size:'}
						name={'size'}
						value={this.props.formSetting.size}
						onChange={this.handleChange}
						options={sizeOptions}
					/>
					<button
						className="btn btn-outline-warning"
						onClick={this.delete}
						type="button"
					>
						Delete Item
					</button>
					<button
						className="btn btn-outline-primary"
						onClick={this.toggleItem}
					>
						Close Item
					</button>
				</form>
			</div>
		);
	}
}

formSetting.propTypes = {
	addFormSetting: PropTypes.func,
	changeFormSetting: PropTypes.func,
	deleteFormSetting: PropTypes.func,
	formSetting: PropTypes.object,
	id: PropTypes.number
};

export default formSetting;
