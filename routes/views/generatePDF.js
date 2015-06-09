var keystone = require('keystone'),
numeral = require('numeral'),
request = require('request'),
pdf = require('html-pdf'),
_ = require('underscore');



exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;

	var slugs = [];
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

			_.each(locals.data.yachts.results, populateYachts);
			generatePDF(slugs[0],next);
			
			
		});
		
	});

	function populateYachts(yacht){
		slugs.push(yacht.slug)
	}

	function generatePDF(yacht,next){
        var options = { filename: process.env.CLOUD_DIR+"/generated/pdf/"+yacht+".pdf", format: 'A4', "header":{"height":"30mm","contents":'<div id="header" class="big" style="height:30mm; width:810px; margin-left: -20px; padding-top:20px; background:white; text-align: center;"><img src="data:image/png;base64,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"/></div>' },
			  "footer": {
			    "height": "20mm",
			    "contents": '<div id="footer-wrap" style="height:18mm; border-top:1px solid #103158; float: left;clear: none;text-align: inherit;width: 810px;position: absolute;bottom: 0; left:-20px; padding-left:20px; background: white; color:#103158;"><div class="footer" style="width: 82.8333333333333%;margin-left: 0%;margin-right: 3%;position: relative;left: 8.5833333333333%;padding: 0;text-align: center; font-size: 9px"><ul style=" list-style: none; "><li style="display: inline-block;font-size: 11px;">www.equinoxeyachts.com | &nbsp;</li><li style="display: inline-block;font-size: 11px;">ey@equinoxeyacths.it | &nbsp;</li><li style="display: inline-block;font-size: 11px;">Torino: +39 011 8185211 | </li><li style="display: inline-block;font-size: 11px;">&nbsp;Corrado Di Majo mobile +39 335 5967552</li></ul><p font-size: 9px !important;">All yachts offered are subject to still being available. Yacht particulars are believed to be correct but their contents are not guaranteed, neither may they be used for any contractual purposes. Specification provided for information only. Subject to prior sale, price change or withdrawal from market without notice.</p></div></div>'
			  }};
		var url_string = process.env.WEB_URL+"/api/print/"+yacht;


			
        request(url_string, function (error, response, body) {
		    pdf.create(body, options).toFile(function(err, res) {
			  if (err) return console.log(err);
			  if (typeof slugs !== 'undefined' && slugs.length > 0) {
				 slugs.shift();
			  		generatePDF(slugs[0]);
				}else{
					next(err);
				}
			  
		

			});
		});
	}




		
	
	// Render the view
	view.render('generatePDF');
	
};	