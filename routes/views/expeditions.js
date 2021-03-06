var keystone = require('keystone'),
	numeral = require('numeral');


exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;
	locals.section = req.__("menu5");
	locals.filters = {
		zone: req.query.z

	};
	locals.data = {
		expeditions: []
	};

	// Load the posts
	view.on('init', function(next) {

		var q = keystone.list('Expedition').paginate({
				page: req.query.page || 1,
				perPage: 500,
				maxPages: 10
			})
			.where('state', 'published')
			.sort('name',1);

		if (locals.filters.zone) {
			q.where('zone').equals(locals.filters.zone);
		}

		q.exec(function(err, results) {
			locals.data.expeditions = results;
			console.log(locals.data.expeditions );
			next(err);
		});

	});


	// Render the view
	view.render('expeditions_list', {numeralFunction : numeral});

};
