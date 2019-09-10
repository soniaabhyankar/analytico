// Imports
const express = require('express');
require('./db/mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start express app
const app = express();

// Port on which the server runs
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());


// Routers
const locationRouter = require('./routes/api/location');

app.use(locationRouter);




app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});