// Imports
const express = require('express');
require('./db/mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Start express app
const app = express();

// Port on which the server runs
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

// Routers
const userRouter = require('./routes/api/user');
const locationRouter = require('./routes/api/location');
const statsRouter = require('./routes/api/stats');

app.use('/api', locationRouter);
app.use('/api', userRouter);
app.use('/api', statsRouter);



app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});