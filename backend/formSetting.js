// /backend/formSetting.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// FormSettingSchema wird die Datenstruktur unserer Datenbank sein
const FormSettingSchema = new Schema(
	{
		id: Number,
		name: String,
		label: String,
		placeholder: String,
		help: String,
		regExp: String,
		size: String,
		type: String,
		option1: String,
		option2: String,
		option3: String
	},
	{ timestamps: true }
);

// Exportieren des neuen FormSettingSchema
module.exports = mongoose.model('FormSetting', FormSettingSchema);
