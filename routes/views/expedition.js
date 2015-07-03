var keystone = require('keystone'),
	async = require('async');
	numeral = require('numeral');
	_=require('underscore');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Set locals
	locals.section = 'expedition';
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
			var arrImg = [];
			var arrCap = [];
			var arrPos = [];
			var galleries = [];
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

			for (i = 0; i < 10; i++) { 
				galleries.push({img:arrImg[i],cap:arrCap[i],pos:arrPos[i]})
			}
			var sortedGalleries = _.sortBy( galleries, "pos" );
			result["sortedGalleries"] = sortedGalleries;
		
			locals.data.expedition = result;
			next(err);
		});
		
	});
	

	
	// Render the view
	view.render('expedition',{numeralFunction : numeral});
	
};
