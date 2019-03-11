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
			formSettings: [],
			counter: 0,
			formDatas: {}
		};

		this.formViewRef = React.createRef();
		this.addFormSetting = this.addFormSetting.bind(this);
	}

	getDataFromDb = () => {
		fetch('http://localhost:8080/api/getData')
			.then(data => data.json())
			.then(res =>
				this.setState({
					formSettings: res.data,
					counter: res.data.length
				})
			);
	};

	componentDidMount() {
		this.getDataFromDb();
	}

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
			.post('http://localhost:8080/api/updateData', {
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
				self.getDataFromDb();
			});

		if (name == 'regExp') this.formViewRef.current.validation(index);
	};

	addFormSetting(name) {
		// let currentIds = this.state.data.map(data => data.id);
		// let idToBeAdded = 0;
		// while (currentIds.includes(idToBeAdded)) {
		// 	++idToBeAdded;
		// }
		let index = this.state.counter;
		let self = this;
		axios
			.post('http://localhost:8080/api/putData', {
				id: index,
				name: name
			})
			.then(function() {
				self.getDataFromDb();
			});
	}

	deleteFromDB = idTodelete => {
		let objIdToDelete = null;
		this.state.data.forEach(dat => {
			if (dat.id == idTodelete) {
				objIdToDelete = dat._id;
			}
		});

		axios.delete('http://localhost:8080/api/deleteData', {
			data: {
				id: objIdToDelete
			}
		});
	};
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
			.delete('http://localhost:8080/api/deleteData', {
				data: {
					id: objIdToDelete
				}
			})
			.then(function() {
				self.getDataFromDb();
			});
	};

	saveFormData = formDatas => {
		this.setState({ formDatas: formDatas });
		this.formViewRef.current.validation();
	};

	render() {
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
							formDatas={this.state.formDatas}
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
