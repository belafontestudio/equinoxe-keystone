var async = require('async'),
	keystone = require('keystone');

	var Expeditions = keystone.list('Expedition');


exports.filter = function(req, res) {
		var q = Expeditions.paginate({
				page: req.query.page || 1,
				perPage: 500,
				maxPages: 10
			})
			.where('state', 'published')
			.sort('name',1);
		
		if (req.query.z) {
			q.where('zone').equals(req.query.z);
		}
		


		q.exec(function(err, items) {
			res.apiResponse({
			list: items
			});
		});


};