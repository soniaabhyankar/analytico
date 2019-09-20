const express = require('express');
const uuidv4 = require('uuid/v4');
const User = require('../../models/user');

const router = new express.Router();

router.get('/user', (req, res) => {
	try {
		// res.cookie('user_id', uuidv4());
		res.send(req.cookies.user_id);
		console.log(req.cookies.user_id);
	}
	catch (e) {
		console.log(e);
	}
});

router.post('/user', async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		res.status(201).send(user);
	}
	catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;