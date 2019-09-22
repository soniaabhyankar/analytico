import axios from 'axios';

const url = 'http://localhost:5000/api/stats';

class Stats {
	static showStats(checked) {
		return new Promise(async (resolve, reject) => {
			try {
				const features = {};

				features[checked[0]] = true;
				features[checked[1]] = true;

				const stats = await axios.post(url, features);

				resolve(stats.data.entries);
			}
			catch (error) {
				reject(error);
			}
		});
	}

	static showFacts(user_id) {
		return new Promise(async (resolve, reject) => {

			try {
				const response = await axios.post('http://localhost:5000/api/facts', { user_id });

				resolve(response.data);
			}
			catch (error) {
				reject(error);
			}
		});
	}
}

export default Stats;