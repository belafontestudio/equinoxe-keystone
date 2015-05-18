// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();


// Require keystone
var keystone = require('keystone'),
	i18n= require('i18n');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'mongo': process.env.MONGO_URI || "mongodb://localhost/equinoxe",
	'name': 'Equinoxe',
	'brand': 'Equinoxe',
	
	'sass': 'public',
	'static': ['public','bower_components',process.env.CLOUD_DIR,process.env.TEMP_DIR],
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',
	
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': 'Sbbm~T!9?"=iNzpNUb@kL]nT!y2t22TE=#JWSPh&Hb)R{gV,Z/5+~.Ir"SfOpC~r',
	'wysiwyg override toolbar': true,
	'wysiwyg menubar': false,
	'wysiwyg skin': 'lightgray',
	'wysiwyg additional buttons': 'pastetext,paste',
	'wysiwyg additional plugins': 'paste',
	'wysiwyg additional options': {"paste_retain_style_properties": "color font-size"},
	'wysiwyg cloudinary images': false,
});



// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Configure i18n
 
i18n.configure({
	locales:['en', 'it'],
	defaultLocale: 'en',
	directory: __dirname + '/locales'
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'users': 'users',
	'yachts': 'yachts'
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
