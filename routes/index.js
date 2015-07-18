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
    serveIndex = require('serve-index'),
		sitemap = require('keystone-express-sitemap');

// Add-in i18n support
keystone.pre('routes', i18n.init);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
    views: importRoutes('./views'),
    api: importRoutes('./api')
};

keystone.set('404', function(req, res, next) {
    res.status(404).render('errors/404');
});
keystone.set('500', function(req, res, next) {
    res.status(500).render('errors/500');
});



// Setup Route Bindings
exports = module.exports = function(app) {
		app.get('/sitemap.xml', function(req, res) {
		  sitemap.create(keystone, req, res, {
		      ignore: ['^\/api.*$','^\/media.*$']
		  });
		});
    // Views
    app.get('/', routes.views.index);

    app.get('/yachts/:availability', routes.views.yachts);
    app.get('/yacht/:yacht', routes.views.yacht);


    app.get('/expeditions', routes.views.expeditions);
    app.get('/expedition/:expedition', routes.views.expedition);

    app.use('/app-storage',serveIndex(process.env.CLOUD_DIR, {'icons': true}));

    app.get('/app-storage', middleware.requireUser);
    app.use('/temp',serveIndex(process.env.TEMP_DIR, {'icons': true}));
    app.get('/temp', middleware.requireUser);




    app.get('/yacht_brokerage', routes.views.yachtBrokerage);
    app.get('/yacht_charter', routes.views.yachtCharter);
    app.get('/expeditions_planning', routes.views.expeditionsPlanning);
    app.get('/bareboat', routes.views.bareboat);
    app.get('/services', routes.views.services);
    app.get('/heritage', routes.views.heritage);


    //API
    //app.get('/media/clean', middleware.requireUser, routes.views.mediaclean);
    app.get('/media/list', middleware.requireUser, routes.views.medialist);
    app.get('/media/backup', middleware.requireUser, routes.views.mediadownload);
    app.get('/media/generate/pdfLite', middleware.requireUser, routes.views.generatePDF);


    app.get('/api/pdf/full/:yacht', keystone.initAPI, routes.api.pdfFull);
    app.get('/api/pdf/lite/:yacht', keystone.initAPI, routes.api.pdfLite);
    app.get('/api/yachts/filter', keystone.initAPI, routes.api.yachts.filter);
    app.get('/api/expeditions/filter', keystone.initAPI, routes.api.expeditions.filter);





};
