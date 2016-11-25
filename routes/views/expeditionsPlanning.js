var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;
	locals.section = req.__("menu5");
	locals.data = {
		arctic: [],
		antarctic: [],
		galapagos: [],
		tropics: []
	};

	view.on('init', function(next) {

		var q = keystone.list('Expedition').paginate({
				page: 1,
				perPage: 10,
				maxPages: 1
			})
			.where('state', 'published')
			.sort({ 'rates from': 1 })
			.where('zone').equals("Arctic")


		var r = keystone.list('Expedition').paginate({
				page: 1,
				perPage: 10,
				maxPages: 1
			})
			.where('state', 'published')
			.sort({ 'rates from': 1 })
			.where('zone').equals("Antarctic")


		var s = keystone.list('Expedition').paginate({
				page: 1,
				perPage: 10,
				maxPages: 1
			})
			.where('state', 'published')
			.sort({ 'rates from': 1 })
			.where('zone').equals("Galapagos")

		var t = keystone.list('Expedition').paginate({
				page: 1,
				perPage: 10,
				maxPages: 1
			})
			.where('state', 'published')
			.sort({ 'rates from': 1 })
			.where('zone').equals("Tropics")



		q.exec(function(err, results) {
			locals.data.arctic = results;
			r.exec(function(err, results) {
				locals.data.antarctic = results;
				s.exec(function(err, results) {
					locals.data.galapagos = results;
					t.exec(function(err, results) {
						locals.data.tropics = results;
						next(err);
					});
				});
			});
		});


	});
	// Render the view
	view.render('expeditions_planning');

};
