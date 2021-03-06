var keystone = require('keystone'),
	async = require('async'),
	numeral = require('numeral'),
	pdf = require('html-pdf'),
	request = require('request');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	// Set locals
	locals.section = 'yacht';
	locals.filters = {
		yacht: req.params.yacht
	};

	locals.data = {
		yachts: [],
		url: process.env.WEB_URL
	};

	// Load the current post
	view.on('init', function(next) {

		var q = keystone.list('Yacht').model.findOne({
			slug: locals.filters.yacht
		});

		q.exec(function(err, result) {
			var arrImg = [];
			var arrCap = [];
			var arrPos = [];
			var galleries = [];
		
			if( typeof result.gallery1 !== 'undefined' || typeof result.gallery1 !== 'null') {
					if(result.gallery1){
					arrImg.push(result.gallery1.img1);
					arrImg.push(result.gallery1.img2);
					arrImg.push(result.gallery1.img3);
					arrImg.push(result.gallery1.img4);
					arrImg.push(result.gallery1.img5);
					arrImg.push(result.gallery1.img6);
					arrImg.push(result.gallery1.img7);
					arrImg.push(result.gallery1.img8);
					arrImg.push(result.gallery1.img9);
					arrImg.push(result.gallery1.img10);

					arrCap.push(result.gallery1.cap1);
					arrCap.push(result.gallery1.cap2);
					arrCap.push(result.gallery1.cap3);
					arrCap.push(result.gallery1.cap4);
					arrCap.push(result.gallery1.cap5);
					arrCap.push(result.gallery1.cap6);
					arrCap.push(result.gallery1.cap7);
					arrCap.push(result.gallery1.cap8);
					arrCap.push(result.gallery1.cap9);
					arrCap.push(result.gallery1.cap10);

					arrPos.push(result.gallery1.pos1);
					arrPos.push(result.gallery1.pos2);
					arrPos.push(result.gallery1.pos3);
					arrPos.push(result.gallery1.pos4);
					arrPos.push(result.gallery1.pos5);
					arrPos.push(result.gallery1.pos6);
					arrPos.push(result.gallery1.pos7);
					arrPos.push(result.gallery1.pos8);
					arrPos.push(result.gallery1.pos9);
					arrPos.push(result.gallery1.pos10);
					}
				}
				if( typeof result.gallery2 !== 'undefined' || typeof result.gallery2 !== 'null') {
					if(result.gallery2){
						arrImg.push(result.gallery2.img1);
						arrImg.push(result.gallery2.img2);
						arrImg.push(result.gallery2.img3);
						arrImg.push(result.gallery2.img4);
						arrImg.push(result.gallery2.img5);
						arrImg.push(result.gallery2.img6);
						arrImg.push(result.gallery2.img7);
						arrImg.push(result.gallery2.img8);
						arrImg.push(result.gallery2.img9);
						arrImg.push(result.gallery2.img10);

						arrCap.push(result.gallery2.cap1);
						arrCap.push(result.gallery2.cap2);
						arrCap.push(result.gallery2.cap3);
						arrCap.push(result.gallery2.cap4);
						arrCap.push(result.gallery2.cap5);
						arrCap.push(result.gallery2.cap6);
						arrCap.push(result.gallery2.cap7);
						arrCap.push(result.gallery2.cap8);
						arrCap.push(result.gallery2.cap9);
						arrCap.push(result.gallery2.cap10);

						arrPos.push(result.gallery2.pos1);
						arrPos.push(result.gallery2.pos2);
						arrPos.push(result.gallery2.pos3);
						arrPos.push(result.gallery2.pos4);
						arrPos.push(result.gallery2.pos5);
						arrPos.push(result.gallery2.pos6);
						arrPos.push(result.gallery2.pos7);
						arrPos.push(result.gallery2.pos8);
						arrPos.push(result.gallery2.pos9);
						arrPos.push(result.gallery2.pos10);
					}
				}

			for (i = 0; i < 20; i++) {
				galleries.push({img:arrImg[i],cap:arrCap[i],pos:arrPos[i]})
			}
			var sortedGalleries = _.sortBy( galleries, "pos" );
			result["sortedGalleries"] = sortedGalleries;
			locals.data.yacht = result;
			next(err);
		});


	});



	// Render the view
	view.render('pdfFull',{numeralFunction : numeral});

};
