const request = require('request');

const url = 'https://api.ipgeolocation.io/ipgeo?apiKey=676273e4f16f425899f3007d4284348b';

const options = {
	url,
	json: true
};

const country = (callback) => {
	request(options, (error, { body } = {}) => {
		if (error) {
			callback('Unable to get location', undefined);
		}
		else {
			callback(undefined, {
				country: body.country_name
			});
		}
	});
};

module.exports = country;