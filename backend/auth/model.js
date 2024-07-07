import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
	{
		firstname: String,
		lastname: String,
		classnumber: Number,
		email: String,
		password: String,
	},
	{ timestamps: true },
);

const Model = mongoose.model("studentuser", UserSchema);

export default Model;
