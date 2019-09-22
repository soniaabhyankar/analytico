const express = require('express');
const country = require('../../utils/country');

const router = new express.Router();

//Get location from ipgeolocation util and store it in db for respective user (req.cookies)
router.get('/location', async (req, res) => {
	try {
		country((error, { country }) => {
			if (error) {
				return res.status(500).send({
					error
				});
			}

			res.send({
				country
			});
		})
	}
	catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;  