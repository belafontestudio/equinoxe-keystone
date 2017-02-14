var keystone = require('keystone'),
	pdf = require('html-pdf'),
	request = require('request'),
	Types = keystone.Field.Types,
	_ = require("underscore");
/**
 * Post Model
 * ==========
 */

var Expedition = new keystone.List('Expedition', { sortable: true ,
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true }
});

Expedition.add({

	name: { type: Types.Text, required: true },
	nome: { type: Types.Text },


	cover: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/covers', prefix: '/uploads/images/expeditions/covers', allowedTypes: ['image/jpeg','image/gif','image/png'],
	pre: {width:1920,height:1080},format: function(item, file){

		return '<img src="'+file.href+'" style="max-width: 250px">'
	}},

	thumbnail: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/thumbnails', prefix: '/uploads/images/expeditions/thumbnails/', allowedTypes: ['image/jpeg','image/gif','image/png'],
	pre: {width:480,height:270},format: function(item, file){
		return '<img src="'+file.href+'" style="max-width: 250px">'}
	},

	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	zone: { type: Types.Select, options: 'Arctic, Antarctic, Galapagos,Tropics', default: 'Arctic', index: true },
	duration: { type: Types.Text, index: true },
	durata: { type: Types.Text, index: true },
	"rates from": { type: Types.Number, index: true },
	"prezzi da": { type: Types.Number, index: true },
	"price extra" : { type: Types.Text, index: true },
	"prezzo extra" : { type: Types.Text, index: true },
	"from to": { type: Types.Text, index: true },
	"da a": { type: Types.Text, index: true },
	currency: { type: Types.Select, options: '€,$', default: '€', index: true },
	"message/offers": { type: Types.Text, index: true },
	"messaggio/offerta": { type: Types.Text, index: true },
	"boat type": { type: Types.Text, index: true },
	"tipo barca": { type: Types.Text, index: true },
	departures: { type: Types.Text, index: true },
	partenze: { type: Types.Text, index: true },
	accomodations: { type: Types.Html, wysiwyg: true, height: 400 },
	sistemazioni: { type: Types.Html, wysiwyg: true, height: 400 },
	crew: { type: Types.Html, wysiwyg: true, height: 400 },
	equipaggio: { type: Types.Html, wysiwyg: true, height: 400 },
	dingies: { type: Types.Html, wysiwyg: true, height: 400 },
	comforts: { type: Types.Html, wysiwyg: true, height: 400 },
	vantaggi: { type: Types.Html, wysiwyg: true, height: 400 },
	itinerary: { type: Types.Html, wysiwyg: true, height: 400 },
	itinerari: { type: Types.Html, wysiwyg: true, height: 400 },

	"duration descriptive": { type: Types.Html, wysiwyg: true, height: 400 },
	"durata descrittiva": { type: Types.Html, wysiwyg: true, height: 400 },
	yacht: { type: Types.Text, index: true },
	"yacht2 name": { type: Types.Text, wysiwyg: true, height: 400 },
	"yacht2a name": { type: Types.Text, wysiwyg: true, height: 400 },
	"yacht descriptive": { type: Types.Html, wysiwyg: true, height: 400 },
	"yacht descrittiva": { type: Types.Html, wysiwyg: true, height: 400 },
	"yacht2 url": { type: Types.Text, wysiwyg: true, height: 400 },
	"yacht2a url": { type: Types.Text, wysiwyg: true, height: 400 },
	"other yachts title": { type: Types.Text, wysiwyg: true, height: 400 },
	"other yachts": { type: Types.Html, wysiwyg: true, height: 400 },
	"yacht3 name": { type: Types.Text, wysiwyg: true, height: 400 },
	"altri yachts titolo": { type: Types.Text, wysiwyg: true, height: 400 },
	"altri yachts": { type: Types.Html, wysiwyg: true, height: 400 },
	"yacht3 url": { type: Types.Text, wysiwyg: true, height: 400 },
	"url yacht": { type: Types.Text, index: true },
	map:{
		img1: { type: Types.LocalFile, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}
		},
		img2: { type: Types.LocalFile, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}
		},
		img3: { type: Types.LocalFile, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}
		},
		img4: { type: Types.LocalFile, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}
		},
		img5: { type: Types.LocalFile, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}
		},
		img6: { type: Types.LocalFile, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}
		},
		img7: { type: Types.LocalFile, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}
		},
		img8: { type: Types.LocalFile, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}
		},
		img9: { type: Types.LocalFile, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}
		},
		img10: { type: Types.LocalFile, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}
		}
	},
	"credits and terms": { type: Types.Html, wysiwyg: true, height: 400 },
	"crediti e termini": { type: Types.Html, wysiwyg: true, height: 400 },

	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },

	gallery1: {

		img1: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos1: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap1 : { type: Types.Text},

		img2: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos2: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap2 : { type: Types.Text},

		img3: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos3: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap3 : { type: Types.Text},

		img4: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos4: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap4 : { type: Types.Text},

		img5: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos5: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap5 : { type: Types.Text},

		img6: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos6: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap6 : { type: Types.Text},

		img7: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos7: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap7 : { type: Types.Text},

		img8: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos8: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap8 : { type: Types.Text},

		img9: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos9: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap9 : { type: Types.Text},


		img10: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos10: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap10 : { type: Types.Text}
	},


	gallery2: {

		img1: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos1: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap1 : { type: Types.Text},

		img2: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos2: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap2 : { type: Types.Text},

		img3: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos3: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap3 : { type: Types.Text},

		img4: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos4: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap4 : { type: Types.Text},

		img5: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos5: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap5 : { type: Types.Text},

		img6: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos6: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap6 : { type: Types.Text},

		img7: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos7: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap7 : { type: Types.Text},

		img8: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos8: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap8 : { type: Types.Text},

		img9: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos9: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap9 : { type: Types.Text},


		img10: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos10: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap10 : { type: Types.Text}


	},
	gallery3: {

		img1: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos1: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap1 : { type: Types.Text},

		img2: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos2: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap2 : { type: Types.Text},

		img3: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos3: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap3 : { type: Types.Text},

		img4: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos4: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap4 : { type: Types.Text},

		img5: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos5: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap5 : { type: Types.Text},

		img6: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos6: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap6 : { type: Types.Text},

		img7: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos7: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap7 : { type: Types.Text},

		img8: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos8: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap8 : { type: Types.Text},

		img9: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos9: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap9 : { type: Types.Text},


		img10: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos10: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap10 : { type: Types.Text}
	},
	"yacht4 name": { type: Types.Text, wysiwyg: true, height: 400 },
	"extra barca4": { type: Types.Html, wysiwyg: true, height: 400 },
	"extra yacht4": { type: Types.Html, wysiwyg: true, height: 400 },
	"yacht4 url": { type: Types.Text, wysiwyg: true, height: 400 },
	gallery4: {

		img1: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos1: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap1 : { type: Types.Text},

		img2: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos2: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap2 : { type: Types.Text},

		img3: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos3: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap3 : { type: Types.Text},

		img4: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos4: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap4 : { type: Types.Text},

		img5: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos5: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap5 : { type: Types.Text},

		img6: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos6: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap6 : { type: Types.Text},

		img7: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos7: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap7 : { type: Types.Text},

		img8: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos8: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap8 : { type: Types.Text},

		img9: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos9: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap9 : { type: Types.Text},


		img10: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos10: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap10 : { type: Types.Text}


	},
	"yacht5 name": { type: Types.Text, wysiwyg: true, height: 400 },
	"extra barca5": { type: Types.Html, wysiwyg: true, height: 400 },
	"extra yacht5": { type: Types.Html, wysiwyg: true, height: 400 },
	"yacht5 url": { type: Types.Text, wysiwyg: true, height: 400 },
	gallery5: {

		img1: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos1: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap1 : { type: Types.Text},

		img2: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos2: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap2 : { type: Types.Text},

		img3: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos3: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap3 : { type: Types.Text},

		img4: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos4: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap4 : { type: Types.Text},

		img5: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos5: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap5 : { type: Types.Text},

		img6: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos6: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap6 : { type: Types.Text},

		img7: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos7: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap7 : { type: Types.Text},

		img8: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos8: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap8 : { type: Types.Text},

		img9: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos9: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap9 : { type: Types.Text},


		img10: { type: Types.LocalImage, dest: process.env.CLOUD_DIR+'/uploads/images/expeditions/galleries', prefix: '/uploads/images/expeditions/galleries', allowedTypes: ['image/jpeg','image/gif','image/png'],
		pre: {width:1920,height:1080},format: function(item, file){
			return '<img src="'+file.href+'" style="max-width: 300px">'}},
		pos10: { type: Types.Select, options: '1,2,3,4,5,6,7,8,9,10', default: '5'},
		cap10 : { type: Types.Text}
	}

	})




Expedition.defaultColumns = 'title, zone|20%, price|20%, currency|20%';
Expedition.register();
