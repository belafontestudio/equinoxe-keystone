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
				var arrImg4 = [];
				var arrCap4 = [];
				var arrPos4 = [];
				var galleries4 = [];
				var arrImg5 = [];
				var arrCap5 = [];
				var arrPos5 = [];
				var galleries5 = [];
				var arrImgmap = [];

				var galleriesmap = [];
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
				if( typeof result.gallery4 !== 'undefined' || typeof result.gallery4 !== 'null') {
					if(result.gallery4){
						arrImg4.push(result.gallery4.img1);
						arrImg4.push(result.gallery4.img2);
						arrImg4.push(result.gallery4.img3);
						arrImg4.push(result.gallery4.img4);
						arrImg4.push(result.gallery4.img5);
						arrImg4.push(result.gallery4.img6);
						arrImg4.push(result.gallery4.img7);
						arrImg4.push(result.gallery4.img8);
						arrImg4.push(result.gallery4.img9);
						arrImg4.push(result.gallery4.img10);

						arrCap4.push(result.gallery4.cap1);
						arrCap4.push(result.gallery4.cap2);
						arrCap4.push(result.gallery4.cap3);
						arrCap4.push(result.gallery4.cap4);
						arrCap4.push(result.gallery4.cap5);
						arrCap4.push(result.gallery4.cap6);
						arrCap4.push(result.gallery4.cap7);
						arrCap4.push(result.gallery4.cap8);
						arrCap4.push(result.gallery4.cap9);
						arrCap4.push(result.gallery4.cap10);

						arrPos4.push(result.gallery4.pos1);
						arrPos4.push(result.gallery4.pos2);
						arrPos4.push(result.gallery4.pos3);
						arrPos4.push(result.gallery4.pos4);
						arrPos4.push(result.gallery4.pos5);
						arrPos4.push(result.gallery4.pos6);
						arrPos4.push(result.gallery4.pos7);
						arrPos4.push(result.gallery4.pos8);
						arrPos4.push(result.gallery4.pos9);
						arrPos4.push(result.gallery4.pos10);
					}
				}
				if( typeof result.gallery5 !== 'undefined' || typeof result.gallery5 !== 'null') {
					if(result.gallery5){
						arrImg5.push(result.gallery5.img1);
						arrImg5.push(result.gallery5.img2);
						arrImg5.push(result.gallery5.img3);
						arrImg5.push(result.gallery5.img4);
						arrImg5.push(result.gallery5.img5);
						arrImg5.push(result.gallery5.img6);
						arrImg5.push(result.gallery5.img7);
						arrImg5.push(result.gallery5.img8);
						arrImg5.push(result.gallery5.img9);
						arrImg5.push(result.gallery5.img10);

						arrCap5.push(result.gallery5.cap1);
						arrCap5.push(result.gallery5.cap2);
						arrCap5.push(result.gallery5.cap3);
						arrCap5.push(result.gallery5.cap4);
						arrCap5.push(result.gallery5.cap5);
						arrCap5.push(result.gallery5.cap6);
						arrCap5.push(result.gallery5.cap7);
						arrCap5.push(result.gallery5.cap8);
						arrCap5.push(result.gallery5.cap9);
						arrCap5.push(result.gallery5.cap10);

						arrPos5.push(result.gallery5.pos1);
						arrPos5.push(result.gallery5.pos2);
						arrPos5.push(result.gallery5.pos3);
						arrPos5.push(result.gallery5.pos4);
						arrPos5.push(result.gallery5.pos5);
						arrPos5.push(result.gallery5.pos6);
						arrPos5.push(result.gallery5.pos7);
						arrPos5.push(result.gallery5.pos8);
						arrPos5.push(result.gallery5.pos9);
						arrPos5.push(result.gallery5.pos10);
					}
				}
				if( typeof result.gallerymap !== 'undefined' || typeof result.gallerymap !== 'null') {
					if(result.map){
						arrImgmap.push(result.map.img1);
						arrImgmap.push(result.map.img2);
						arrImgmap.push(result.map.img3);
						arrImgmap.push(result.map.img4);
						arrImgmap.push(result.map.img5);
						arrImgmap.push(result.map.img6);
						arrImgmap.push(result.map.img7);
						arrImgmap.push(result.map.img8);
						arrImgmap.push(result.map.img9);
						arrImgmap.push(result.map.img10);

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
				for (t = 0; t < 10; t++) {
					galleriesmap.push({img:arrImgmap[t]})
				}
				for (l = 0; l < 10; l++) {
					galleries4.push({img:arrImg4[l],cap:arrCap4[l],pos:arrPos4[l]})
				}
				for (r = 0; r < 10; r++) {
					galleries5.push({img:arrImg5[r],cap:arrCap5[r],pos:arrPos5[r]})
				}

				var sortedGalleries = _.sortBy( galleries, "pos" );
				var sortedGalleries2 = _.sortBy( galleries2, "pos" );
				var sortedGalleries3 = _.sortBy( galleries3, "pos" );
				var sortedGalleries4 = _.sortBy( galleries4, "pos" );
				var sortedGalleries5 = _.sortBy( galleries5, "pos" );
				result["sortedGalleries"] = sortedGalleries;
				result["sortedGalleries2"] = sortedGalleries2;
				result["sortedGalleries3"] = sortedGalleries3;
				result["sortedGalleries4"] = sortedGalleries4;
				result["sortedGalleries5"] = sortedGalleries5;
				result["galleriesmap"] = galleriesmap;

				locals.data.expedition = result;
				next(err);
			}
		});


	});



	// Render the view
	view.render('expedition',{numeralFunction : numeral});

};
