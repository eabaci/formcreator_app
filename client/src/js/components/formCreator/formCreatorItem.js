import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import InputCreatorItem from './inputCreatorItem';
import SelectCreatorItem from './selectCreatorItem';

// Komponente FormCreatorItem
// props:
// id (number)
// formSetting (object)
// changeFormSetting (func)
// deleteFormSetting (func)

class FormCreatorItem extends React.Component {
	labelRef = React.createRef();
	formRef = React.createRef();

	typeOptions = {
		radio: 'Radio',
		checkbox: 'Checkbox',
		text: 'Input',
		textarea: 'Textarea',
		select: 'Select'
	};
	sizeOptions = {
		tiny: 'Tiny',
		small: 'Small',
		medium: 'Medium',
		large: 'Large'
	};

	// Die componentDidMount Methode
	// Ruft die Methode changeFormSetting auf und übergibt die
	// Informationen der Änderung
	componentDidMount() {
		this.formSetting = this.props.formSetting || {};
		this.formSetting['id'] = this.props.id;
	}

	// Die handleChange Methode
	// Ruft die Methode changeFormSetting auf und übergibt die
	// Informationen der Änderung
	handleChange = (name, value) => {
		this.formSetting[name] = value;
		this.props.changeFormSetting(this.formSetting, this.props.id, name);
	};

	handleSubmit = event => {
		event.preventDefault();
	};

	// Die delete Methode
	// Ruft die Methode deleteFormSetting auf und übergibt die
	// ID des zu löschenden FormSetting
	delete = () => {
		this.props.deleteFormSetting(this.props.id);
	};

	// Die toggleItem Methode
	// Hierbei wird der Bereich des FormSettings geöffnet
	// oder geschlossen
	toggleItem = () => {
		let formNode = $(this.formRef.current);
		let labelNode = $(this.labelRef.current);
		if (formNode.hasClass('invisible')) {
			labelNode.addClass('invisible');
			formNode.removeClass('invisible');
		} else if (labelNode.hasClass('invisible')) {
			formNode.addClass('invisible');
			labelNode.removeClass('invisible');
		}
	};

	// Die render Methode
	// Die einzelnen FormCreator Bereiche (InputCreatorItem, SelectCreatorItem)
	// werden gerendert
	// So wie die Delete und Close Button
	render() {
		let cnCheckType =
			this.props.formSetting.type == 'radio' ||
			this.props.formSetting.type == 'checkbox' ||
			this.props.formSetting.type == 'select'
				? 'invisible'
				: '';
		let cnTextType =
			this.props.formSetting.type == 'text' ||
			this.props.formSetting.type == 'textarea'
				? 'invisible'
				: '';
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
						className={cnCheckType}
						name={'placeholder'}
						value={this.props.formSetting.placeholder}
						label={'Placeholder:'}
						onChange={this.handleChange}
					/>
					<InputCreatorItem
						className={cnCheckType}
						name={'help'}
						value={this.props.formSetting.help}
						label={'Help:'}
						onChange={this.handleChange}
					/>
					<InputCreatorItem
						className={cnCheckType}
						name={'regExp'}
						value={regExpString}
						label={'RegExp:'}
						onChange={this.handleChange}
					/>
					<SelectCreatorItem
						label={'Type:'}
						name={'type'}
						value={this.props.formSetting.type}
						onChange={this.handleChange}
						options={this.typeOptions}
					/>
					<InputCreatorItem
						className={cnTextType}
						name={'option1'}
						value={this.props.formSetting.option1}
						label={'Option 1:'}
						onChange={this.handleChange}
					/>
					<InputCreatorItem
						className={cnTextType}
						name={'option2'}
						value={this.props.formSetting.option2}
						label={'Option 2:'}
						onChange={this.handleChange}
					/>
					<InputCreatorItem
						className={cnTextType}
						name={'option3'}
						value={this.props.formSetting.option3}
						label={'Option 3:'}
						onChange={this.handleChange}
					/>
					<SelectCreatorItem
						label={'Size:'}
						name={'size'}
						value={this.props.formSetting.size}
						onChange={this.handleChange}
						options={this.sizeOptions}
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

FormCreatorItem.propTypes = {
	addFormSetting: PropTypes.func,
	changeFormSetting: PropTypes.func,
	deleteFormSetting: PropTypes.func,
	formSetting: PropTypes.object,
	id: PropTypes.number
};

export default FormCreatorItem;
