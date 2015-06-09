var keystone = require('keystone'),
	async = require('async'),
	numeral = require('numeral'),
	pdf = require('html-pdf'),
	request = require('request');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Set locals
	locals.section = 'yacht';
	locals.filters = {
		yacht: req.params.yacht
	};
	
	locals.data = {
		yachts: [],
		url: process.env.WEB_URL
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
	

	
	// Render the view
	view.render('yachtPrint',{numeralFunction : numeral});
	
};
