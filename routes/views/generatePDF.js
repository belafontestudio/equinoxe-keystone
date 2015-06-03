var keystone = require('keystone'),
numeral = require('numeral'),
request = require('request'),
pdf = require('html-pdf'),
_ = require('underscore');

var keystone = require('keystone');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;


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
			.sort('-lenght')
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
			if(locals.filters.type == "Sails"){
				q.where('type').in([locals.filters.type,"Catamaran"])
			}else{
				q.where('type').equals(locals.filters.type)
			}
		}

		
		
		q.exec(function(err, results) {
			if (locals.filters.availability) {
				results.availability = locals.filters.availability;
			}

			locals.data.yachts = results;
			_.each(locals.data.yachts.results, generatePDF);
			next(err);
			
		});
		
	});
	

	function generatePDF(yacht){
		var options = { filename: process.env.CLOUD_DIR+"/generated/pdf/"+yacht.slug+".pdf", format: 'A4' };
			
        request("http://localhost:3000/api/print/"+yacht.slug, function (error, response, body) {
		    pdf.create(body, options).toFile(function(err, res) {
			  if (err) return console.log(err);

			  

			});
		});
	}




		
	
	// Render the view
	view.render('generatePDF');
	
};	