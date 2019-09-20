const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	user_id: {
		type: String,
		required: true,
		trim: true
	},
	gender: {
		type: String,
		required: true,
		trim: true
	},
	religion: {
		type: String,
		required: true,
		trim: true
	}
});

userSchema.statics.findUser = async (user_id) => {
	const user = await User.findOne({ user_id });

	if (!user) {
		throw new Error('User not found');
	}

	return user;
}

const User = mongoose.model('User', userSchema);

module.exports = User;