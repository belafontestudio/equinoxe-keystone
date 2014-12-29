var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Yacht = new keystone.List('Yacht', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Yacht.add({
	title: { type: String, required: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	lenght: { type: Types.Number, index: true },
	cost: { type: Types.Money, index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	}
});

Yacht.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Yacht.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Yacht.register();