var keystone = require('keystone'),
	pdf = require('html-pdf'),
	request = require('request'),
	Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Yacht = new keystone.List('Yacht', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true }
});

Yacht.add({

	name: { type: Types.Text, required: true },

	cover: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/yachts/covers', prefix: '/uploads/images/yachts/covers', allowedTypes: ['image/jpeg','image/gif','image/png'],
	pre: {width:1920,height:1080},format: function(item, file){

		return '<img src="'+file.href+'" style="max-width: 250px">'
	}},

	thumbnail: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/yachts/thumbnails', prefix: '/uploads/images/yachts/thumbnails/', allowedTypes: ['image/jpeg','image/gif','image/png'],
	pre: {width:480,height:270},format: function(item, file){

		return '<img src="'+file.href+'" style="max-width: 250px">'}},
	"pdf url": {type: Types.Text, required: false, readonly: true},
	featured: { type: Types.Boolean },
	pdf: { type: Types.Boolean },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	type: { type: Types.Select, options: 'Power, Sails, Gulet, Catamaran', default: 'Power', index: true },
	availability: { type: Types.Select, options: 'Sale, Charter', default: 'Charter', index: true },
	model: {type: Types.Text, required: false},
	builder: {type: Types.Text, required: false},
	designer: {type: Types.Text, required: false},
	build: {type: Types.Text, required: false},
	refit: {type: Types.Text, required: false},
	flag: {type: Types.Text, required: false},
	lenght: { type: Types.Number, index: true },
	beam: { type: Types.Number, index: true },
	draft: { type: Types.Number, index: true },
	displacement: { type: Types.Number, index: true },

	flag: {type: Types.Text, required: false},
	engine: {type: Types.Text, required: false},

	"crusing speed": { type: Types.Number, index: true },
	consumption: {type: Types.Text, required: false},

	guests: { type: Types.Number, index: true },
	crew: { type: Types.Number, index: true },

	cabins: { type: Types.Text, index: true },
	"guests cabins": { type: Types.Text, index: true },
	"crew cabins": { type: Types.Text, index: true },

	price: { type: Types.Number, index: true },
	"price per week from": { type: Types.Number, index: true },
	"price per week low season": { type: Types.Number, index: true },
	"price per week high season": { type: Types.Number, index: true },
	vat: { type: Types.Text, index: true },
	currency: { type: Types.Select, options: '€,$', default: '€', index: true },

	location: { type: Types.Text, index: true },


	"message/offers": { type: Types.Text, index: true },
	location: { type: Types.Text, index: true },

	author: { type: Types.Relationship, ref: 'User', index: true },

	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },

	gallery1: {

		img1: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/yachts/galleries', prefix: '/uploads/images/yachts/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos1: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap1 : { type: Types.Text},

		img2: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/yachts/galleries', prefix: '/uploads/images/yachts/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos2: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap2 : { type: Types.Text},

		img3: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/yachts/galleries', prefix: '/uploads/images/yachts/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos3: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap3 : { type: Types.Text},

		img4: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/yachts/galleries', prefix: '/uploads/images/yachts/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos4: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap4 : { type: Types.Text},

		img5: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/yachts/galleries', prefix: '/uploads/images/yachts/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos5: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap5 : { type: Types.Text},

		img6: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/yachts/galleries', prefix: '/uploads/images/yachts/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos6: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap6 : { type: Types.Text},

		img7: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/yachts/galleries', prefix: '/uploads/images/yachts/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos7: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap7 : { type: Types.Text},

		img8: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/yachts/galleries', prefix: '/uploads/images/yachts/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos8: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap8 : { type: Types.Text},

		img9: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/yachts/galleries', prefix: '/uploads/images/yachts/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos9: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap9 : { type: Types.Text},


		img10: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/yachts/galleries', prefix: '/uploads/images/yachts/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos10: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap10 : { type: Types.Text},
	},


	gallery2: {

		img1: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/yachts/galleries', prefix: '/uploads/images/yachts/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos1: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap1 : { type: Types.Text},

		img2: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/yachts/galleries', prefix: '/uploads/images/yachts/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos2: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap2 : { type: Types.Text},

		img3: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/yachts/galleries', prefix: '/uploads/images/yachts/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos3: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap3 : { type: Types.Text},

		img4: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/yachts/galleries', prefix: '/uploads/images/yachts/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos4: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap4 : { type: Types.Text},

		img5: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/yachts/galleries', prefix: '/uploads/images/yachts/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos5: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap5 : { type: Types.Text},

		img6: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/yachts/galleries', prefix: '/uploads/images/yachts/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos6: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap6 : { type: Types.Text},

		img7: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/yachts/galleries', prefix: '/uploads/images/yachts/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos7: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap7 : { type: Types.Text},

		img8: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/yachts/galleries', prefix: '/uploads/images/yachts/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos8: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap8 : { type: Types.Text},

		img9: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/yachts/galleries', prefix: '/uploads/images/yachts/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos9: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap9 : { type: Types.Text},


		img10: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/yachts/galleries', prefix: '/uploads/images/yachts/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos10: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap10 : { type: Types.Text},


	},
	content: {
		"water sports": { type: Types.Html, wysiwyg: true, height: 400 },
		description: { type: Types.Html, wysiwyg: true, height: 400 },
		"description full specs": { type: Types.Html, wysiwyg: true, height: 1000 }
	}
});

Yacht.schema.pre('save', function(next) {
	var yacht = this;
	if ( yacht.pdf == true ) {
        var options = { filename: process.env.CLOUD_DIR+"/generated/pdf/"+yacht.slug+".pdf", format: 'A4', "header":{"height":"30mm","contents":'<div id="header" class="big" style="height:20mm; width:810px; margin-left: -20px; padding-top:20px; text-align: center;"><img style="width:220px;" src="data:image/png;base64,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"></div>' },
			  "footer": {
			    "height": "20mm",
			    "contents": '<div id="footer-wrap" style="height:18mm; border-top:1px solid #103158; float: left;clear: none;text-align: inherit;width: 810px;position: absolute;bottom: 0; left:-20px; padding-left:20px; background: white; color:#103158;"><div class="footer" style="width: 82.8333333333333%;margin-left: 0%;margin-right: 3%;position: relative;left: 8.5833333333333%;padding: 0;text-align: center; font-size: 9px"><ul style=" list-style: none; "><li style="display: inline-block;font-size: 11px;">www.equinoxeyachts.com | &nbsp;</li><li style="display: inline-block;font-size: 11px;">ey@equinoxeyacths.it | &nbsp;</li><li style="display: inline-block;font-size: 11px;">Torino: +39 011 8185211 | </li><li style="display: inline-block;font-size: 11px;">&nbsp;Corrado Di Majo mobile +39 335 5967552</li></ul><p font-size: 9px !important;">All yachts offered are subject to still being available. Yacht particulars are believed to be correct but their contents are not guaranteed, neither may they be used for any contractual purposes. Specification provided for information only. Subject to prior sale, price change or withdrawal from market without notice.</p></div></div>'
			  }};
        request("http://localhost:3000/api/print/"+yacht.slug,function (error, response, body) {
				    pdf.create(body, options).toFile(function(err, res) {
					  if (err) return console.log(err);

					  yacht.pdf = false;
					  yacht["pdf url"] = "http://localhost:3000/generated/pdf/"+yacht.slug+".pdf";
					  next();

					});
		});
    }else{
    	next();
    }

});

Yacht.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Yacht.defaultColumns = 'title, price|20%, type|20%, availability|20%';
Yacht.register();
