var keystone = require('keystone'),
	async = require('async');
	numeral = require('numeral');
	_=require('underscore');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;
	locals.section = req.__("menu5");
	locals.filters = {
		expedition: req.params.expedition
	};
	locals.data = {
		expeditions: []
	};


	// Load the current post
	view.on('init', function(next) {

		var q = keystone.list('Expedition').model.findOne({
			slug: locals.filters.expedition
		});

		q.exec(function(err, result) {
			if (!result) {

				if (!result) {
					res.status(404).render('errors/404');

				}else{
					next(err)
				}
			}else{
				var arrImg = [];
				var arrCap = [];
				var arrPos = [];
				var galleries = [];
				var arrImg2 = [];
				var arrCap2 = [];
				var arrPos2 = [];
				var galleries2 = [];
				var arrImg3 = [];
				var arrCap3 = [];
				var arrPos3 = [];
				var galleries3 = [];
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
						arrImg2.push(result.gallery2.img1);
						arrImg2.push(result.gallery2.img2);
						arrImg2.push(result.gallery2.img3);
						arrImg2.push(result.gallery2.img4);
						arrImg2.push(result.gallery2.img5);
						arrImg2.push(result.gallery2.img6);
						arrImg2.push(result.gallery2.img7);
						arrImg2.push(result.gallery2.img8);
						arrImg2.push(result.gallery2.img9);
						arrImg2.push(result.gallery2.img10);

						arrCap2.push(result.gallery2.cap1);
						arrCap2.push(result.gallery2.cap2);
						arrCap2.push(result.gallery2.cap3);
						arrCap2.push(result.gallery2.cap4);
						arrCap2.push(result.gallery2.cap5);
						arrCap2.push(result.gallery2.cap6);
						arrCap2.push(result.gallery2.cap7);
						arrCap2.push(result.gallery2.cap8);
						arrCap2.push(result.gallery2.cap9);
						arrCap2.push(result.gallery2.cap10);

						arrPos2.push(result.gallery2.pos1);
						arrPos2.push(result.gallery2.pos2);
						arrPos2.push(result.gallery2.pos3);
						arrPos2.push(result.gallery2.pos4);
						arrPos2.push(result.gallery2.pos5);
						arrPos2.push(result.gallery2.pos6);
						arrPos2.push(result.gallery2.pos7);
						arrPos2.push(result.gallery2.pos8);
						arrPos2.push(result.gallery2.pos9);
						arrPos2.push(result.gallery2.pos10);
					}
				}
				if( typeof result.gallery3 !== 'undefined' || typeof result.gallery3 !== 'null') {
					if(result.gallery3){
						arrImg3.push(result.gallery3.img1);
						arrImg3.push(result.gallery3.img2);
						arrImg3.push(result.gallery3.img3);
						arrImg3.push(result.gallery3.img4);
						arrImg3.push(result.gallery3.img5);
						arrImg3.push(result.gallery3.img6);
						arrImg3.push(result.gallery3.img7);
						arrImg3.push(result.gallery3.img8);
						arrImg3.push(result.gallery3.img9);
						arrImg3.push(result.gallery3.img10);

						arrCap3.push(result.gallery3.cap1);
						arrCap3.push(result.gallery3.cap2);
						arrCap3.push(result.gallery3.cap3);
						arrCap3.push(result.gallery3.cap4);
						arrCap3.push(result.gallery3.cap5);
						arrCap3.push(result.gallery3.cap6);
						arrCap3.push(result.gallery3.cap7);
						arrCap3.push(result.gallery3.cap8);
						arrCap3.push(result.gallery3.cap9);
						arrCap3.push(result.gallery3.cap10);

						arrPos3.push(result.gallery3.pos1);
						arrPos3.push(result.gallery3.pos2);
						arrPos3.push(result.gallery3.pos3);
						arrPos3.push(result.gallery3.pos4);
						arrPos3.push(result.gallery3.pos5);
						arrPos3.push(result.gallery3.pos6);
						arrPos3.push(result.gallery3.pos7);
						arrPos3.push(result.gallery3.pos8);
						arrPos3.push(result.gallery3.pos9);
						arrPos3.push(result.gallery3.pos10);
					}
				}
				for (i = 0; i < 10; i++) {
					galleries.push({img:arrImg[i],cap:arrCap[i],pos:arrPos[i]})
				}
				for (k = 0; k < 10; k++) {
					galleries2.push({img:arrImg2[k],cap:arrCap2[k],pos:arrPos2[k]})
				}
				for (j = 0; j < 10; j++) {
					galleries3.push({img:arrImg3[j],cap:arrCap3[j],pos:arrPos3[j]})
				}
				var sortedGalleries = _.sortBy( galleries, "pos" );
				var sortedGalleries2 = _.sortBy( galleries2, "pos" );
				var sortedGalleries3 = _.sortBy( galleries3, "pos" );
				result["sortedGalleries"] = sortedGalleries;
				result["sortedGalleries2"] = sortedGalleries2;
				result["sortedGalleries3"] = sortedGalleries3;

				locals.data.expedition = result;
				next(err);
			}
		});


	});



	// Render the view
	view.render('expedition',{numeralFunction : numeral});

};
