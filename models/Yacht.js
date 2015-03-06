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

	featured: { type: Types.Boolean },

	"message/offers": { type: Types.Text, index: true },
	location: { type: Types.Text, index: true },

	author: { type: Types.Relationship, ref: 'User', index: true },
	
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },

	cover: { type: Types.LocalFile, dest: 'public/uploads/images', prefix: '/uploads/images/', datePrefix: "YYMMDDHHMMSS",
	format: function(item, file){

		return '<div class="cropper"><img src="'+file.href+'" style="max-width: 300px"></div>'
	}},

	
	content: {
		description: { type: Types.Html, wysiwyg: true, height: 400 },
		"description full specs": { type: Types.Html, wysiwyg: true, height: 1000 }
	}
});

Yacht.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Yacht.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Yacht.register();