const express = require('express');
const connection = require('./connection');
const uuidv4 = require('uuid/v4');
var router = express.Router();

router.use(require('./auth.js'));

router.get('/', (req, res, next) => {
	Username = req.get('Username');
	const prospectquery = `SELECT * FROM Application NATURAL JOIN Prospect WHERE Username = "${Username}";`;
	const pendingquery = `SELECT * FROM Application NATURAL JOIN Pending WHERE Username = "${Username}";`;
	const acceptquery = `SELECT * FROM Application NATURAL JOIN Accept WHERE Username = "${Username}";`;
	const rejectquery = `SELECT * FROM Application NATURAL JOIN Reject WHERE Username = "${Username}";`;
	console.log(prospectquery);
	connection.query(prospectquery, (err, prospectresults, fields) => {
		if(err) {res.json({'err': 'sql'}); console.log('error sql'); return;}
		console.log(pendingquery);
		connection.query(pendingquery, (err, pendingresults, fields) => {
		if(err) {res.json({'err': 'sql'}); console.log('error sql'); return;}
		console.log(acceptquery);
		connection.query(acceptquery, (err, acceptresults, fields) => {
		if(err) {res.json({'err': 'sql'}); console.log('error sql'); return;}
		console.log(rejectquery);
		connection.query(rejectquery, (err, rejectresults, fields) => {
		if(err) {res.json({'err': 'sql'}); console.log('error sql'); return;}
			res.json({prospect: prospectresults,
						pending: pendingresults,
						accept: acceptresults,
						reject: rejectresults,
						err:'none'});
		})
		})
		})
	});

});

//post a new application
router.post('/prospect', (req, res, next) => {
	Username = req.get('Username');
	AppID = uuidv4();//random id
	Name = req.body.Name;
	Position = req.body.Position;
	if(Position){ Position = `"${Position}"`; }else{ Position = 'NULL'; }
	Link = req.body.Link;
	if(Link){ Link = `"${Link}"`; }else{ Link = 'NULL'; }
	if(!Name){ res.json({'err': 'missing'}); return; }

	applicationquery = `INSERT INTO Application VALUES("${Username}", "${AppID}", "${Name}", ${Position});`;
	prospectquery = `INSERT INTO Prospect VALUES("${Username}", "${AppID}", ${Link});`;
	console.log(applicationquery);
	connection.query(applicationquery, (err, results, fields) => {
		if(err) {res.json({'err': 'sql'}); console.log('error sql'); return;}
		console.log(prospectquery);
		connection.query(prospectquery, (err, results, fields) => {
		if(err) {res.json({'err': 'sql'}); console.log('error sql'); return;}
		else{ res.json({'err': 'none', 'AppID': AppID}); return;}
		});
	});
});

//patch from prospect to pending
router.patch('/pending', (req, res, next) => {
	Username = req.get('Username');
	AppID = req.body.AppID;
	
	deletequery = `DELETE FROM Prospect WHERE Username="${Username}" AND AppID="${AppID}";`;
	insertquery = `INSERT INTO Pending VALUES("${Username}", "${AppID}", CURDATE());`;
	console.log(deletequery);
	connection.query(deletequery, (err, results, fields) => {
		if(results.affectedRows == 0){res.json({'err': 'unknown'}); return;}
		if(err) {res.json({'err': 'sql'}); console.log('error sql'); return;}
		console.log(insertquery);
		connection.query(insertquery, (err, results, fields) => {
		if(err) {res.json({'err': 'sql'}); console.log('error sql'); return;}
		else{ res.json({'err': 'none'}); return;}
		});
	});
});

//patch from pending to reject
router.patch('/reject', (req, res, next) => {
	Username = req.get('Username');
	AppID = req.body.AppID;
	
	deletequery = `DELETE FROM Pending WHERE Username="${Username}" AND AppID="${AppID}";`;
	insertquery = `INSERT INTO Reject VALUES("${Username}", "${AppID}", CURDATE());`;
	console.log(deletequery);
	connection.query(deletequery, (err, results, fields) => {
		if(err) {res.json({'err': 'sql'}); console.log('error sql'); return;}
		if(results.affectedRows == 0){res.json({'err': 'unknown'}); return;}
		console.log(insertquery);
		connection.query(insertquery, (err, results, fields) => {
		if(err) {res.json({'err': 'sql'}); console.log('error sql'); return;}
		else{ res.json({'err': 'none'}); return;}
		});
	});
});

//patch from pending to accept
router.patch('/accept', (req, res, next) => {
	Username = req.get('Username');
	AppID = req.body.AppID;
	
	deletequery = `DELETE FROM Pending WHERE Username="${Username}" AND AppID="${AppID}";`;
	insertquery = `INSERT INTO Accept VALUES("${Username}", "${AppID}", CURDATE());`;
	console.log(deletequery);
	connection.query(deletequery, (err, results, fields) => {
		if(err) {res.json({'err': 'sql'}); console.log('error sql'); return;}
		if(results.affectedRows == 0){res.json({'err': 'unknown'}); return;}
		console.log(insertquery);
		connection.query(insertquery, (err, results, fields) => {
		if(err) {res.json({'err': 'sql'}); console.log('error sql'); return;}
		else{ res.json({'err': 'none'}); return;}
		});
	});
})

router.delete('/', (req, res, next) => {
	Username = req.get('Username');
	AppID = req.get('AppID');

	deletequery = `DELETE FROM Application WHERE Username="${Username}" AND AppID="${AppID}"`;
	console.log(deletequery);
	connection.query(deletequery, (err, results, fields) => {
		if(err) {res.json({'err': 'sql'}); console.log('error sql'); return;}
		if(results.affectedRows == 0){res.json({'err': 'unknown'}); return;}
		else{ res.json({'err':'none'}); return;}
	});

});

module.exports = router;
