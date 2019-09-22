import axios from 'axios';

const url = 'http://localhost:5000/api/user';

class UserService {
	static setUserCookie() {
		return new Promise(async (resolve, reject) => {
			try {
				const cookie = await axios.get(url);
				resolve(cookie.data);
			}
			catch (err) {
				reject(err);
			}
		});
	}

	static createUser(user_id, gender, religion) {
		return new Promise(async (resolve, reject) => {
			try {
				const country = await axios.get('http://localhost:5000/api/location');
				const user = await axios.post(url, {
					user_id: user_id,
					gender: gender,
					religion: religion,
					country: country.data.country
				});
				resolve(user.data);
			}
			catch (error) {
				reject(error);
			}
		});
	}
}

export default UserService;
