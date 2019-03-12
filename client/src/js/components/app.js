import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import FormView from './formView/formView';
import FormData from './formData/formData';
import FormCreator from './formCreator/formCreator';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			formSettings: []
		};

		this.formViewRef = React.createRef();
	}

	getFormSetting = () => {
		fetch('http://localhost:8080/api/getFormSetting')
			.then(data => data.json())
			.then(res =>
				this.setState({
					formSettings: res.data
				})
			);
	};

	// Die componentDidMount Methode
	// Hier werden die FormSettings mit einem GET Request geladen.
	componentDidMount() {
		console.log('componentDidMount');
		this.getFormSetting();
	}

	// Die changeFormSetting Methode
	// Hier wird das entsprechende FormSetting aktualisiert mit einem POST Request.
	changeFormSetting = (formSetting, index, name) => {
		let formSettings = this.state.formSettings;
		let objIdToUpdate = null;
		let self = this;
		formSettings.forEach(formSetting => {
			if (formSetting.id == index) {
				objIdToUpdate = formSetting._id;
			}
		});

		axios
			.post('http://localhost:8080/api/updateFormSetting', {
				id: objIdToUpdate,
				update: {
					label: formSetting.label,
					placeholder: formSetting.placeholder,
					help: formSetting.help,
					regExp: formSetting.regExp,
					size: formSetting.size,
					type: formSetting.type,
					option1: formSetting.option1,
					option2: formSetting.option2,
					option3: formSetting.option3
				}
			})
			.then(function() {
				self.getFormSetting();
			});

		if (name == 'regExp') this.formViewRef.current.validation(index);
	};

	// Die addFormSetting Methode
	// Hier wird ein neues FormSetting hinzugefügt mit einem POST Request.
	addFormSetting = name => {
		let currentIds = this.state.formSettings.map(
			formSetting => formSetting.id
		);
		let idToBeAdded = 0;
		while (currentIds.includes(idToBeAdded)) {
			++idToBeAdded;
		}
		let self = this;
		axios
			.post('http://localhost:8080/api/putFormSetting', {
				id: idToBeAdded,
				name: name
			})
			.then(function() {
				self.getFormSetting();
			});
	};

	// Die deleteFormSetting Methode
	// Hier wird das entsprechende FormSetting gelöscht mit einem DELETE Request.
	deleteFormSetting = index => {
		let objIdToDelete = null;
		let formSettings = this.state.formSettings;
		let self = this;
		formSettings.forEach(formSetting => {
			if (formSetting.id == index) {
				objIdToDelete = formSetting._id;
			}
		});

		axios
			.delete('http://localhost:8080/api/deleteFormSetting', {
				data: {
					id: objIdToDelete
				}
			})
			.then(function() {
				self.getFormSetting();
			});
	};

	// Die saveFormData Methode
	// Wird aufgerufen nach dem das Formular erfolgreich ausgefüllt wurde
	// und schickt die Formular Daten mit einem POST Request zum Server
	saveFormData = formDatas => {
		fetch('http://localhost:8080/api/getFormData')
			.then(data => data.json())
			.then(res => {
				let currentIds = res.data.map(formData => formData.id);
				let idToBeAdded = 0;
				while (currentIds.includes(idToBeAdded)) {
					++idToBeAdded;
				}
				axios.post('http://localhost:8080/api/putFormData', {
					id: idToBeAdded,
					object: formDatas
				});
			});
	};

	// Die render Methode
	// Es werden die Komponenten FormCreator, FormView, FormData gerendert
	render() {
		console.log('render app');
		return (
			<Container fluid="true">
				<Row>
					<Col xs="3">
						<FormCreator
							formSettings={this.state.formSettings}
							addFormSetting={this.addFormSetting}
							changeFormSetting={this.changeFormSetting}
							deleteFormSetting={this.deleteFormSetting}
						/>
					</Col>
					<Col xs="6">
						<h1 className="headline">Formular Creator</h1>
						<FormView
							formSettings={this.state.formSettings}
							saveFormData={this.saveFormData}
							ref={this.formViewRef}
						/>
					</Col>
					<Col xs="3">
						<FormData formSettings={this.state.formSettings} />
					</Col>
				</Row>
			</Container>
		);
	}
}

export default App;
