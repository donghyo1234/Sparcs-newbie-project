const mongoose = require("mongoose");

const OSchemaDefinition = {
	username: String,
	password: String,
};
const OSchemaOptions = { timestamps: true };

const schema = new mongoose.Schema(OSchemaDefinition, OSchemaOptions);

const AccountModel = mongoose.model("account", schema);

module.exports = AccountModel;
