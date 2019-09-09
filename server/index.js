require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const router = require('./controllers/router');
const bodyParser = require('body-parser');
const cors = require('cors');
// const exjwt = require('express-jwt');

// Serve static files from the React frontend app
// app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(express.static('public'));
app.use(cors());
app.use('/', router);

/*========= Here we want to let the server know that we should expect and allow a header with the content-type of 'Authorization' ============*/
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
	next();
});

/*========= Here we will set up an express jsonwebtoken middleware(simply required for express to properly utilize the token for requests) You MUST instantiate this with the same secret that will be sent to the client ============*/
// const jwtMW = exjwt({
// 	secret: 'keyboard cat 4 ever'
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`);
});
