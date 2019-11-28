var express = require('express')
var router = express.Router()

router.use(require('./auth.js'))

router.get('/', (req, res, next) => {
	res.json({'status': 'good'});
})

module.exports = router;
