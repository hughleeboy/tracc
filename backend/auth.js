connection = require('./connection.js');
bcrypt = require('bcrypt');

module.exports = function(req, res, next) {
	const Username = req.get('Username');
	const Password = req.get('Password');
	console.log(req.connection.remoteAddress);
	if(!Username || !Password){
		res.json({'err': 'missing'}); return;
	}
	const findquery = `SELECT Password FROM User WHERE Username = "${Username}";`;
	//console.log(findquery);
	connection.query(findquery , (err, results, fields) => {
		if(err) {res.json({'err': 'sql'}); console.log('error sql'); return;}
		if(results.length != 1) {res.json({'err':'unknown'}); return;}
		let hash = results[0].Password;
		bcrypt.compare(Password, hash, (err, result) => {
			if(err) {res.json({'err': 'bcrypt'}); console.log('error bcrypt'); return;}
			if(!result){ res.json({'status': 'bad'}); console.log('invalid password'); return;}//pw dont match
			else{next();}//pw matches
		});
	});
	//at this point auth is bad, dont call next
}

