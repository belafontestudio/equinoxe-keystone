var keystone = require('keystone'),
	async = require('async');
	numeral = require('numeral');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Set locals
	locals.section = 'yacht';
	locals.filters = {
		yacht: req.params.yacht
	};
	
	locals.data = {
		yachts: []
	};
	
	// Load the current post
	view.on('init', function(next) {
		
		var q = keystone.list('Yacht').model.findOne({
			slug: locals.filters.yacht
		}).populate('author');
		
		q.exec(function(err, result) {
			locals.data.yacht = result;
			next(err);
		});
		
	});
	
	// Load other posts
	view.on('init', function(next) {
		
		var q = keystone.list('Yacht').model.find().sort('-publishedDate').populate('author').limit('4');
		
		q.exec(function(err, results) {
			locals.data.yachts = results;
			next(err);
		});
		
	});
	
	// Render the view
	view.render('yacht',{numeralFunction : numeral});
	
};
