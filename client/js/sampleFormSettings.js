const formSettings = {
	formSetting0: {
		id: 0,
		name: 'firstName',
		label: 'First Name',
		placeholder: '',
		help: '',
		regExp: '/[a-z]+/i',
		type: 'text',
		size: 'medium'
	},
	formSetting1: {
		id: 1,
		name: 'lastName',
		label: 'Last Name',
		placeholder: '',
		help: '',
		regExp: '/[a-z]+/i',
		type: 'text',
		size: 'medium'
	},
	formSetting2: {
		id: 2,
		name: 'email',
		label: 'E-Mail',
		placeholder: 'user@mail.de',
		help: 'Please enter your E-Mail Adress',
		regExp: '/\\w+@\\w+.de/i',
		type: 'text',
		size: 'large'
	},
	formSetting3: {
		id: 3,
		name: 'street',
		label: 'Street',
		placeholder: '',
		help: '',
		type: 'text',
		size: 'medium'
	},
	formSetting4: {
		id: 4,
		name: 'postalcode',
		label: 'Postal code',
		placeholder: '',
		help: '',
		type: 'text',
		size: 'tiny'
	},
	formSetting5: {
		id: 5,
		name: 'city',
		label: 'City',
		placeholder: '',
		help: '',
		type: 'text',
		size: 'small'
	},
	formSetting6: {
		id: 6,
		name: 'iban',
		label: 'IBAN',
		placeholder: '',
		help: '',
		type: 'text',
		size: 'medium'
	},
	formSetting7: {
		id: 7,
		name: 'bic',
		label: 'BIC',
		placeholder: '',
		help: '',
		type: 'text',
		size: 'medium'
	},
	formSetting8: {
		id: 8,
		name: 'question1',
		label: 'Wie findest du React?',
		type: 'radio',
		option1: 'sehr gut',
		option2: 'gut',
		option3: 'nicht so gut',
		size: 'medium'
	},
	formSetting9: {
		id: 9,
		name: 'question2',
		label: 'Was isst du gerne zum Mittag?',
		type: 'checkbox',
		option1: 'Pizza',
		option2: 'Spagetti',
		option3: 'Salat',
		size: 'medium'
	},
	formSetting10: {
		id: 10,
		name: 'question3',
		label: 'Was isst du gerne zum Mittag?',
		type: 'select',
		option1: 'Pizza',
		option2: 'Spagetti',
		option3: 'Salat',
		size: 'large'
	}
};

export default formSettings;
