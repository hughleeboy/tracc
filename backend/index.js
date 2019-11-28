const app = require('express')();
const connection = require('./connection');
const bcrypt = require('bcrypt');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const port = 9002;
let counter = 0;

// middleware
app.use(bodyParser.json());

//cors
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Username, Password");
    res.header("Access-Control-Allow-Methods","GET, POST, DELETE, PATCH");
	next();
});

//logger
app.use((req, res, next) => {
	console.log('\n', counter++, 'got ', req.method,' req at ', req.url);
	next();
})

//auth middleware

const loginRoute = require('./login.js');
app.use('/login', loginRoute);

const userRoute = require('./user.js');
app.use('/user', userRoute);

const applicationsRoute = require('./applications.js');
app.use('/applications', applicationsRoute);

https.createServer({
	key: fs.readFileSync('/etc/letsencrypt/live/hughboy.com/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/hughboy.com/cert.pem')
}, app).listen(port, () => {
	console.log(`tracc listening on port ${port}`);
})

