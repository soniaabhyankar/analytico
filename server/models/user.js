const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	user_id: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	gender: {
		type: String,
		required: true,
		trim: true,
		default: 'Male'
	},
	religion: {
		type: String,
		required: true,
		trim: true,
		default: 'Hindu'
	},
	country: {
		type: String,
		required: true,
		trim: true,
		default: 'Germany'
	}
});

userSchema.statics.findUser = async (user_id) => {
	const user = await User.findOne({ user_id });

	if (!user) {
		throw new Error('User not found');
	}

	return user;
}

userSchema.statics.facts = async (country, gender, religion) => {

	const totalUsers = await User.find().countDocuments();

	const countryCount = await User.find({ country }).countDocuments();
	const genderCount = await User.find({ gender }).countDocuments();
	const religionCount = await User.find({ religion }).countDocuments();

	const calcCountry = Math.round((countryCount / totalUsers) * 100);
	const calcGender = Math.round((genderCount / totalUsers) * 100);
	const calcReligion = Math.round((religionCount / totalUsers) * 100);

	const data = {
		country: calcCountry,
		gender: calcGender,
		religion: calcReligion
	}
	return data;
}

userSchema.statics.countryReligion = async () => {

	const countries = await User.distinct('country');

	const religions = await User.distinct('religion');

	var counts = { entries: [] };

	for (let i = 0; i < countries.length; i++) {
		let countryCount = await User.countDocuments({ country: countries[i] })

		counts.entries.push({
			country: countries[i],
			countryCount: countryCount,
			religions: []
		})

		for (let j = 0; j < religions.length; j++) {
			const data = (await User.aggregate([
				{ $match: { country: countries[i] } },

				{ $match: { religion: religions[j] } },
			]))

			if (data.length > 0) {
				counts.entries[i]['religions'].push({

					religion: religions[j],
					count: data.length
				})

			}
		}
	}
	return counts;
}

userSchema.statics.countryGender = async () => {

	const countries = await User.distinct('country');

	const genders = await User.distinct('gender');

	var counts = { entries: [] };

	for (let i = 0; i < countries.length; i++) {
		let countryCount = await User.countDocuments({ country: countries[i] })

		counts.entries.push({
			country: countries[i],
			countryCount: countryCount,
			genders: []
		})

		for (let j = 0; j < genders.length; j++) {
			const data = (await User.aggregate([
				{ $match: { country: countries[i] } },

				{ $match: { gender: genders[j] } },
			]))

			if (data.length > 0) {
				counts.entries[i]['genders'].push({

					gender: genders[j],
					count: data.length
				})

			}
		}
	}
	return counts;
}

userSchema.statics.religionGender = async () => {

	const religions = await User.distinct('religion');

	const genders = await User.distinct('gender');

	var counts = { entries: [] };

	for (let i = 0; i < religions.length; i++) {
		let religionCount = await User.countDocuments({ religion: religions[i] })

		counts.entries.push({
			religion: religions[i],
			religionCount: religionCount,
			genders: []
		})

		for (let j = 0; j < genders.length; j++) {
			const data = (await User.aggregate([
				{ $match: { religion: religions[i] } },

				{ $match: { gender: genders[j] } },
			]))

			if (data.length > 0) {
				counts.entries[i]['genders'].push({

					gender: genders[j],
					count: data.length
				})

			}
		}
	}
	return counts;
}

const User = mongoose.model('User', userSchema);

module.exports = User;