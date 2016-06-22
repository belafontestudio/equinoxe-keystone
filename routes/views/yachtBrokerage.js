var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

		req.setLocale('en');

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'yacht_brokerage';

	locals.data = {
		featured: []
	};

	// Load the posts
	view.on('init', function(next) {

		var q = keystone.list('Yacht').paginate({
				page: 1,
				perPage: 3,
				maxPages: 1
			})
			.where('state', 'published')
			.sort('-publishedDate')
			.where('availability').equals("Sale")
			.where('featured',true);




		q.exec(function(err, results) {
			locals.data.featured = results;

			next(err);
		});

	});
	// Render the view
	view.render('yacht_brokerage', {numeralFunction : numeral});

};
