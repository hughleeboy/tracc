const express = require('express');
var router = express.Router();

router.get('/', require('./auth.js'));
router.get('/', (req, res, next) => {
	Username = req.get('Username');
	selectquery = `SELECT Username, FName, LName FROM User WHERE Username="${Username}";`;
	connection.query(selectquery, (err, results, fields) =>{
		if(err) {res.json({'err': 'sql'}); console.log('error sql'); return;}
		else{res.json({'err': 'none', 'Username': results[0].Username})};
	});
});

router.post('/', (req, res, next) => {
	let body = req.body;
	console.log(body);
	if(!body.Username || !body.Password || !body.FName || !body.LName){
		res.json({'err': 'missing'}); return;
	}
	const findquery = `SELECT * FROM User WHERE Username = ${connection.escape(body.Username)};`;
	console.log(findquery);
	connection.query(findquery , (err, results, fields) => {
		if(err) {res.json({'err': 'sql'}); console.log('error sql'); return;}
		if(results.length != 0) {res.json({'err':'collision'}); return;}
		bcrypt.hash(req.body.Password, 10, (err, hash) => {
			if(err) {res.json({'err': 'bcrypt'}); console.log('error bcrypt'); return;}
			insertquery = `INSERT INTO User VALUES (${connection.escape(body.Username)},'${hash}',${connection.escape(body.FName)},${connection.escape(body.LName)})`;
			console.log(insertquery);
			connection.query(insertquery, (err, results, fields) => {
				if(err) {res.json({'err': 'sql'}); console.log('error sql'); return;}
				res.json({'err':'none'});
			});
		});
	});
});

module.exports = router;
