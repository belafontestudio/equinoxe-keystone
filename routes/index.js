/**
 * This file is where you define your application routes and controllers.
 * 
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 * 
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 * 
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 * 
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 * 
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var _ = require('underscore'),
	keystone = require('keystone'),
	i18n = require("i18n"),
	middleware = require('./middleware'),
	importRoutes = keystone.importer(__dirname),
	serveIndex = require('serve-index')

// Add-in i18n support
keystone.pre('routes', i18n.init);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function(app) {

	// Views
	app.get('/', routes.views.index);
	app.get('/yachts/:category?', routes.views.yachts);
	app.get('/yachts/:yacht', routes.views.yacht);
	app.get('/yacht/:yacht', routes.views.yacht);
	app.use('/app-storage',serveIndex(process.env.CLOUD_DIR, {'icons': true}));
	app.get('/app-storage', middleware.requireUser);
	//app.get('/media/clean', middleware.requireUser, routes.views.mediaclean);
	app.get('/media/list', middleware.requireUser, routes.views.medialist);


	app.get('/yacht_brokerage', routes.views.yachtBrokerage);
	app.get('/yacht_charter', routes.views.yachtCharter);
	app.get('/expeditions_planning', routes.views.expeditionsPlanning);
	app.get('/bareboat', routes.views.bareboat);
	app.get('/services', routes.views.services);
	app.get('/heritage', routes.views.heritage);
	app.get('/yachts_list', routes.views.yachtList);

	
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
	
};
