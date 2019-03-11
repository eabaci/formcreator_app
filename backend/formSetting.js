// /backend/data.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// this will be our data base's data structure
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

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('FormSetting', FormSettingSchema);
