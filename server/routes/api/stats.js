const express = require('express');
const User = require('../../models/user');

const router = new express.Router();

router.post('/stats', async (req, res) => {
	const features = Object.keys(req.body);

	try {
		if ((features.includes('country')) && (features.includes('religion'))) {
			const data = await User.countryReligion();
			res.send(data);
		}
		else if (features.includes('country') && features.includes('gender')) {
			const data = await User.countryGender();
			res.send(data);
		}
		else {
			const data = await User.religionGender();
			res.send(data);
		}
	}
	catch (error) {
		res.status(400).send(error);
	}
});

router.post('/facts', async (req, res) => {
	const user_id = req.body.user_id;

	try {
		const user = await User.findUser(user_id);

		const data = await User.facts(user.country, user.gender, user.religion);
		res.send(data);
	}
	catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;