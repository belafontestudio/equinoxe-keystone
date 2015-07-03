var async = require('async'),
	keystone = require('keystone');

	var Yachts = keystone.list('Yacht');


exports.filter = function(req, res) {
		var q = Yachts.paginate({
				page: req.query.page || 1,
				perPage: 500,
				maxPages: 10
			})
			.where('state', 'published')
			.sort('-lenght');
		
		if (req.query.a) {
			q.where('availability').equals(req.query.a);
		}
		if (req.query.ming) {
			q.where('guests').gte(req.query.ming)
		}
		if ( req.query.maxg) {
			q.where('guests').lte( req.query.maxg)
		}
		if (req.query.minp) {
			q.where('price').gte(req.query.minp)
		}
		if (req.query.maxp) {
			q.where('price').lte(req.query.maxp)
		}
		if (req.query.minpw) {
			q.where('price per week from').gte(req.query.minpw)
		}
		if (req.query.maxpw) {
			q.where('price per week from').lte(req.query.maxpw)
		}
		if (req.query.minl) {
			q.where('lenght').gte(req.query.minl)
		}
		if (req.query.maxl) {
			q.where('lenght').lte(req.query.maxl)
		}
		if (req.query.t) {
			if(req.query.t == "Sails"){
				q.where('type').in([req.query.t,"Catamaran"])
			}else{
				q.where('type').equals(req.query.t)
			}

		}


		q.exec(function(err, items) {
			res.apiResponse({
			list: items
			});
		});


};