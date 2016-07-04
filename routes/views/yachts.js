var keystone = require('keystone'),
	numeral = require('numeral');


exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;



	locals.filters = {
		availability: req.params.availability,
		minguests: req.query.ming,
		maxguests: req.query.maxg,
		minprice: req.query.minp,
		maxprice: req.query.maxp,
		minpriceweek: req.query.minpw,
		maxpriceweek: req.query.maxpw,
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
			.sort('-lenght');

		if (locals.filters.availability) {
			q.where('availability').equals(locals.filters.availability);
		}
		if (locals.filters.minguests) {
			q.where('guests').gte(locals.filters.minguests);
		}
		if (locals.filters.maxguests) {
			q.where('guests').lte(locals.filters.maxguests);
		}
		if (locals.filters.minpriceweek) {
			q.where('price per week from').gte(locals.filters.minpriceweek);
		}
		if (locals.filters.minpriceweek) {
			q.where('price per week from').lte(locals.filters.maxpriceweek);
		}
		if (locals.filters.minprice) {
			q.where('price').gte(locals.filters.minprice);
		}
		if (locals.filters.maxprice) {
			q.where('price').lte(locals.filters.maxprice);
		}
		if (locals.filters.minlenght) {
			q.where('lenght').gte(locals.filters.minlenght);
		}
		if (locals.filters.maxlenght) {
			q.where('lenght').lte(locals.filters.maxlenght);
		}
		if (locals.filters.type) {
			if(locals.filters.type == "Sails"){
				q.where('type').in([locals.filters.type,"Catamaran"]);
			}else{
				q.where('type').equals(locals.filters.type);
			}
		}



		q.exec(function(err, results) {
			if (locals.filters.availability) {
				results.availability = locals.filters.availability;
			}

			if (!results || results.availability != "Charter" && results.availability != "Sale") {
				res.status(404).render('errors/404');

			}else{

				locals.data.yachts = results;

				next(err);
			}
		});

	});


	// Render the view
	view.render('yachts_list', {numeralFunction : numeral});

};
