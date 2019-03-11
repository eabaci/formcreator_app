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

// this is our MongoDB database
const dbRoute = 'mongodb://localhost:27017/formapi';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// this is our get method
// this method fetches all available data in our database
router.get('/getFormSetting', async (req, res) => {
	FormSetting.find((err, data) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true, data: data });
	});
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateFormSetting', (req, res) => {
	const { id, update } = req.body;
	FormSetting.findByIdAndUpdate(id, update, err => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true });
	});
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteFormSetting', (req, res) => {
	const { id } = req.body;
	FormSetting.findByIdAndDelete(id, err => {
		if (err) return res.send(err);
		return res.json({ success: true });
	});
});

// this is our create methid
// this method adds new data in our database
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

// this method fetches all available form data in our database
router.get('/getFormData', async (req, res) => {
	FormData.find((err, data) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true, data: data });
	});
});

// this method adds new form data in our database
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

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
