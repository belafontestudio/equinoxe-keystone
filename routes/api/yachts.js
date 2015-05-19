var async = require('async'),
	keystone = require('keystone');

	var Yacht = keystone.list('Yacht');


exports.filter = function(req, res) {
		var q = Yacht.paginate({
				page: req.query.page || 1,
				perPage: 500,
				maxPages: 10
			})
			.where('state', 'published')
			.sort('-lenght')
			.populate('author');
		
		if (req.query.a) {
			q.where('availability').equals(req.query.a);
		}
		if (req.query.ming) {
			q.where('guests').gt(req.query.ming)
		}
		if ( req.query.maxg) {
			q.where('guests').lt( req.query.maxg)
		}
		if (req.query.minp) {
			q.where('price').gt(req.query.minp)
		}
		if (req.query.maxp) {
			q.where('price').lt(req.query.maxp)
		}
		if (req.query.minl) {
			q.where('lenght').gt(req.query.minl)
		}
		if (req.query.maxl) {
			q.where('lenght').lt(req.query.maxl)
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