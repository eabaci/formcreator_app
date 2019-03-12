const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const FormSetting = require('./formSetting');
const FormData = require('./formData');

const API_PORT = 8080;
const app = express();
const router = express.Router();

// MongoDB-Datenbank
const dbRoute = 'mongodb://localhost:27017/formapi';

// verbindet unseren Backend-Code mit der Datenbank
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// prüft, ob die Verbindung zur Datenbank erfolgreich ist
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) nur für das Logging und
// bodyParser, parst den Request-Body in ein lesbares Json-Format
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// Die get Methode
// Diese Methode ruft alle verfügbaren Daten in unserer Datenbank ab
router.get('/getFormSetting', async (req, res) => {
	FormSetting.find((err, data) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true, data: data });
	});
});

// Die update Methode
// Diese Methode überschreibt vorhandene Daten in unserer Datenbank
router.post('/updateFormSetting', (req, res) => {
	const { id, update } = req.body;
	FormSetting.findByIdAndUpdate(id, update, err => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true });
	});
});

// Die delete Methode
// Diese Methode entfernt vorhandene Daten in unserer Datenbank
router.delete('/deleteFormSetting', (req, res) => {
	const { id } = req.body;
	FormSetting.findByIdAndDelete(id, err => {
		if (err) return res.send(err);
		return res.json({ success: true });
	});
});

// Die create Methode
// Diese Methode fügt neue Daten in unsere Datenbank ein
router.post('/putFormSetting', (req, res) => {
	let formSetting = new FormSetting();
	const { id, name } = req.body;

	if ((!id && id !== 0) || !name) {
		return res.json({
			success: false,
			error: 'INVALID INPUTS'
		});
	}
	formSetting.type = 'text';
	formSetting.size = 'large';
	formSetting.name = name;
	formSetting.id = id;
	formSetting.save(err => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true });
	});
});

// Diese Methode ruft alle verfügbaren Daten in unserer Datenbank ab
router.get('/getFormData', async (req, res) => {
	FormData.find((err, data) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true, data: data });
	});
});

// Diese Methode fügt neue Daten in unserer Datenbank hinzu
router.post('/putFormData', (req, res) => {
	let formData = new FormData();
	const { id, object } = req.body;

	if ((!id && id !== 0) || !object) {
		return res.json({
			success: false,
			error: 'INVALID INPUTS'
		});
	}
	formData.object = object;
	formData.id = id;
	formData.save(err => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true });
	});
});

// Fügen Sie /api für unsere http-Anfragen hinzu
app.use('/api', router);

// Startet das Backend in diesem PORT
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
