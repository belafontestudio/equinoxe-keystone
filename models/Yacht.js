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
        var options = { filename: process.env.CLOUD_DIR+"/generated/pdf/"+yacht.slug+".pdf", format: 'A4' };
        request("http://localhost:3000/api/print/"+yacht.slug, function (error, response, body) {
				    pdf.create(body, options).toFile(function(err, res) {
					  if (err) return console.log(err);

					  yacht.pdf = false;
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