var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

		//req.setLocale('en');

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'yacht_charter';
	locals.data = {
		powers: [],
		sails: [],
		gulets: []
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
			.where('availability').equals("Charter")
			.where('type').equals("Power")
			.where('featured',true);

		var r = keystone.list('Yacht').paginate({
				page: 1,
				perPage: 3,
				maxPages: 1
			})
			.where('state', 'published')
			.sort('-publishedDate')
			.where('availability').equals("Charter")
			.where('type').equals("Sails")
			.where('featured',true);

		var s = keystone.list('Yacht').paginate({
				page: 1,
				perPage: 3,
				maxPages: 1
			})
			.where('state', 'published')
			.sort('-publishedDate')
			.where('availability').equals("Charter")
			.where('type').equals("Gulet")
			.where('featured',true);




		q.exec(function(err, results) {
			locals.data.powers = results;
			r.exec(function(err, results) {
				locals.data.sails = results;
				s.exec(function(err, results) {
					locals.data.gulets = results;

					next(err);
				});

			});

		});




	});
	// Render the view

	view.render('yacht_charter', {numeralFunction : numeral});

};
