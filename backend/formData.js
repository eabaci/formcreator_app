// /backend/formData.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// FormDataSchema wird die Datenstruktur unserer Datenbank sein
const FormDataSchema = new Schema(
	{
		id: Number,
		object: Object
	},
	{ timestamps: true }
);

// Exportieren des neuen FormDataSchema
module.exports = mongoose.model('FormData', FormDataSchema);
