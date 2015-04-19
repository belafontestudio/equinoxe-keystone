var keystone = require('keystone'),
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

	cover: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/yachts/covers', prefix: '/uploads/images/yachts/covers',collapse: true, allowedTypes: ['image/jpeg','image/gif','image/png'],
	pre: {width:1920,height:1080},format: function(item, file){

		return '<img src="'+file.href+'" style="max-width: 500px">'
	}},
	thumbnail: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/yachts/thumbnails', prefix: '/uploads/images/yachts/thumbnails/',collapse: true, allowedTypes: ['image/jpeg','image/gif','image/png'],
	pre: {width:480,height:270},format: function(item, file){

		return '<img src="'+file.href+'" style="max-width: 4700px">'}},

	featured: { type: Types.Boolean },

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

	
	test: {
	type: Types.LocalFile,
	dest: process.env.CLOUD_DIR,
	prefix: process.env.CLOUD_DIR,
	format: function(item, file){
		return '<img src="/files/'+file.filename+'" style="max-width: 300px">'
	}
},

	interiors: { 
	
	img1: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/yachts/gallery/interiors', prefix: process.env.CLOUD_DIR+'/uploads/images/yachts/gallery/interiors',collapse: true, allowedTypes: ['image/jpeg','image/gif','image/png'],
	pre: {width:1920,height:1080},format: function(item, file){
		return '<img src="'+file.href+'" style="max-width: 300px">'}},
	cap1 : { type: Types.Text, index: true }
	},
	exteriors: { 
	
	img1: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/yachts/gallery/exteriors', prefix: process.env.CLOUD_DIR+'/uploads/images/yachts/gallery/exteriors',collapse: true, allowedTypes: ['image/jpeg','image/gif','image/png'],
	pre: {width:1920,height:1080},format: function(item, file){
		return '<img src="'+file.href+'" style="max-width: 300px">'}},
	cap1 : { type: Types.Text, index: true }
	},

	content: {
		"water sports": { type: Types.Html, wysiwyg: true, height: 400 },
		description: { type: Types.Html, wysiwyg: true, height: 400 },
		"description full specs": { type: Types.Html, wysiwyg: true, height: 1000 }
	}
});



Yacht.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Yacht.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Yacht.register();