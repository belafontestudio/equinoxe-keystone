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
        var options = { filename: process.env.CLOUD_DIR+"/generated/pdf/"+yacht.slug+".pdf", format: 'A4', "header":{"height":"30mm","contents":'<div id="header" class="big" style="height:30mm; width:810px; margin-left: -20px; padding-top:20px; background:white; text-align: center;"><img src="data:image/png;base64,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"/></div>' },
			  "footer": {
			    "height": "20mm",
			    "contents": '<div id="footer-wrap" style="height:18mm; border-top:1px solid #103158; float: left;clear: none;text-align: inherit;width: 810px;position: absolute;bottom: 0; left:-20px; padding-left:20px; background: white; color:#103158;"><div class="footer" style="width: 82.8333333333333%;margin-left: 0%;margin-right: 3%;position: relative;left: 8.5833333333333%;padding: 0;text-align: center; font-size: 9px"><ul style=" list-style: none; "><li style="display: inline-block;font-size: 11px;">www.equinoxeyachts.com | &nbsp;</li><li style="display: inline-block;font-size: 11px;">ey@equinoxeyacths.it | &nbsp;</li><li style="display: inline-block;font-size: 11px;">Torino: +39 011 8185211 | </li><li style="display: inline-block;font-size: 11px;">&nbsp;Corrado Di Majo mobile +39 335 5967552</li></ul><p font-size: 9px !important;">All yachts offered are subject to still being available. Yacht particulars are believed to be correct but their contents are not guaranteed, neither may they be used for any contractual purposes. Specification provided for information only. Subject to prior sale, price change or withdrawal from market without notice.</p></div></div>'
			  }};
		var url_string = process.env.WEB_URL+"/api/print/"+yacht.slug;

        request( url_string,function (error, response, body) {
				    pdf.create(body, options).toFile(function(err, res) {
					  if (err) return console.log(err);

					  yacht.pdf = false;
					  yacht["pdf url"] = process.env.WEB_URL+"/generated/pdf/"+yacht.slug+".pdf";
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
