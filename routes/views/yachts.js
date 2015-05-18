var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	locals.section = 'yachts';

	locals.filters = {
		availability: req.params.availability,
		minguests: req.query.ming,
		maxguests: req.query.maxg,
		minprice: req.query.minp,
		maxprice: req.query.maxp,
		minlenght: req.query.minl,
		maxlenght: req.query.maxl,
		type: req.query.t,
	};
	locals.data = {
		yachts: []
	};
	
	// Load the posts
	view.on('init', function(next) {
		
		var q = keystone.list('Yacht').paginate({
				page: req.query.page || 1,
				perPage: 500,
				maxPages: 10
			})
			.where('state', 'published')
			.sort('-publishedDate')
			.populate('author');
		
		if (locals.filters.availability) {
			q.where('availability').equals(locals.filters.availability);
		}
		if (locals.filters.minguests) {
			q.where('guests').gt(locals.filters.minguests)
		}
		if (locals.filters.maxguests) {
			q.where('guests').lt(locals.filters.maxguests)
		}
		if (locals.filters.minprice) {
			q.where('price').gt(locals.filters.minprice)
		}
		if (locals.filters.maxprice) {
			q.where('price').lt(locals.filters.maxprice)
		}
		if (locals.filters.minlenght) {
			q.where('lenght').gt(locals.filters.minlenght)
		}
		if (locals.filters.maxlenght) {
			q.where('lenght').lt(locals.filters.maxlenght)
		}
		if (locals.filters.type) {
			q.where('type').equals(locals.filters.type)
		}

		
		
		q.exec(function(err, results) {
			if (locals.filters.availability) {
				results.availability = locals.filters.availability;
			}

			locals.data.yachts = results;
			
			next(err);
		});
		
	});
	
	
	// Render the view
	view.render('yachts_list');
	
};
