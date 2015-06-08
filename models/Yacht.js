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
        var options = { filename: process.env.CLOUD_DIR+"/generated/pdf/"+yacht.slug+".pdf", format: 'A4', "header":{"height":"30mm","contents":'<style>*{background: transparent}</style><div id="header" class="big" style="height:20mm; width:810px; margin-left: -20px; padding-top:20px; background:#103158; text-align: center;"><img style="position:relative; left:20px;" src="data:image/png;base64,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"/></div>' },
			  "footer": {
			    "height": "23mm",
			    "contents": '<div id="footer-wrap" style="height:20mm; float: left;clear: none;text-align: inherit;width: 810px;position: absolute;bottom: 0; left:-20px; padding-left:20px; background: #103158;"><div class="footer" style="width: 82.8333333333333%;margin-left: 0%;margin-right: 3%;position: relative;left: 8.5833333333333%;padding: 0px 0;text-align: center;"><ul style=" list-style: none; color: yellow;"><li style="display: inline-block;font-size: 11px;">www.equinoxeyachts.com | &nbsp;</li><li style="display: inline-block;font-size: 11px;">ey@equinoxeyacths.it | &nbsp;</li><li style="display: inline-block;font-size: 11px;">Torino: +39 011 8185211 | </li><li style="display: inline-block;font-size: 11px;">&nbsp;Corrado Di Majo mobile +39 335 5967552</li></ul><p style="color: #fff;font-size: 9px;">All yachts offered are subject to still being available. Yacht particulars are believed to be correct but their contents are not guaranteed, neither may they be used for any contractual purposes. Specification provided for information only. Subject to prior sale, price change or withdrawal from market without notice.</p></div></div>'
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
