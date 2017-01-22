var express = require('express');
var router = express.Router();
var Category = require('../lib/category.js');

require('../routes/product.js')(router);
require('../routes/offer.js')(router);
require('../routes/history.js')(router);
require('../routes/comment.js')(router);

/***** category ****/
router.post('/', function(req, res) {

	var category = req.body;

	Category.create(category, function (err, category_res) {
		if (err) {
			res.status(500).json({err: err});
		}
		else {
			res.status(201).json(category_res);
		}
	});
});

router.get('/', function(req, res) {
	console.log(req.query.limit, req.query.offset);
	Category.find({}).offset(+req.query.offset || undefined).limit(+req.query.limit || undefined).run( function (err, category_res) {
		if (err) 
			res.status(500).json({err: err});
		else {
			res.json({ categories: category_res});
		}
	});
});

router.get('/:categoryId', function(req, res) {

	Category.find({categoryId: req.params.categoryId}, function (err, category_res) {
		if (err) 
			res.status(500).json({err: err});
		else {
			res.json(category_res[0]);
		}
	});
});

module.exports = router;
