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
    helpers = require('./helpers'),
    importRoutes = keystone.importer(__dirname),
    serveIndex = require('serve-index'),
    robots = require('robots.txt'),
		sitemap = require('keystone-express-sitemap');

    // var proxy = require('http-proxy-middleware');


// Add-in i18n support
keystone.pre('routes', i18n.init);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('routes', helpers.language);
keystone.pre('render', helpers.menu);
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

    app.get('/ita', function(req,res){
      res.setLocale("it");
      res.cookie('equinoxeyachts_language', 'it', { maxAge: 900000, httpOnly: true });
      var host = req.get('host');

      if(host == "localhost:3000"){
        res.redirect('/');
      }else{
        res.redirect('http://equinoxe.it');
      }

    });
    app.get('/eng', function(req,res){
      res.setLocale("en");
      res.cookie('equinoxeyachts_language', 'en', { maxAge: 900000, httpOnly: true });
      var host = req.get('host');

      if(host == "localhost:3000"){
        res.redirect('/');
      }else{
        res.redirect('http://equinoxeyachts.com');
      }
    });

    app.get('/yachts/:availability', function(req,res){
      if(req.cookies.equinoxeyachts_language){
        if(req.cookies.equinoxeyachts_language == "it"){
          res.setLocale("it");
        }else{
          res.cookie('equinoxeyachts_language', 'en', { maxAge: 900000, httpOnly: true });
          res.setLocale("en");
        }

      }else{
        res.cookie('equinoxeyachts_language', 'en', { maxAge: 900000, httpOnly: true });
        res.setLocale("en");
      }
      routes.views.yachts(req,res)
    });
    app.get('/yacht/:yacht', function(req,res){
      if(req.cookies.equinoxeyachts_language){
        if(req.cookies.equinoxeyachts_language == "it"){
          res.setLocale("it");
        }else{
          res.cookie('equinoxeyachts_language', 'en', { maxAge: 900000, httpOnly: true });
          res.setLocale("en");
        }
      }else{
        res.cookie('equinoxeyachts_language', 'en', { maxAge: 900000, httpOnly: true });
        res.setLocale("en");
      }
      routes.views.yacht(req,res)
    });


    // app.get('/expeditions', function(req,res){
    //   res.setLocale("en");
    //   routes.views.expeditions(req,res)
    // });
    // app.get('/spedizioni', function(req,res){
    //   res.setLocale("it");
    //   routes.views.expeditions(req,res)
    // });



    app.get('/expedition/:expedition', routes.views.expedition);

    app.use('/app-storage',serveIndex(process.env.CLOUD_DIR, {'icons': true}));

    app.get('/app-storage', middleware.requireUser);
    app.use('/temp',serveIndex(process.env.TEMP_DIR, {'icons': true}));
    app.get('/temp', middleware.requireUser);

    // Views
    app.get('/', function(req,res){
      var host = req.get('host');

      // if(host == "equinoxe.it"){
      //   res.setLocale("it");
      //   res.cookie('equinoxeyachts_language', 'it', { maxAge: 900000, httpOnly: true });
      // }if(host == "www.equinoxe.it"){
      //   res.setLocale("it");
      //   res.cookie('equinoxeyachts_language', 'it', { maxAge: 900000, httpOnly: true });
      // }else if(host == "equinoxeyachts.com"){
      //   res.setLocale("en");
      //   res.cookie('equinoxeyachts_language', 'en', { maxAge: 900000, httpOnly: true });
      // }else if(host == "www.equinoxeyachts.com"){
      //   res.setLocale("en");
      //   res.cookie('equinoxeyachts_language', 'en', { maxAge: 900000, httpOnly: true });
      // }else if(host == "equinoxeyachts.it"){
      //   res.setLocale("it");
      //   res.cookie('equinoxeyachts_language', 'it', { maxAge: 900000, httpOnly: true });
      // }else if(host == "www.equinoxeyachts.it"){
      //   res.setLocale("it");
      //   res.cookie('equinoxeyachts_language', 'it', { maxAge: 900000, httpOnly: true });
      // }
      routes.views.index(req,res)
    });

    app.get('/yacht-brokerage', function(req,res){
      if(req.cookies.equinoxeyachts_language){
        if(req.cookies.equinoxeyachts_language == "it"){
          res.redirect('/vendita-yacht');
        }else{
          routes.views.yachtBrokerage(req,res)
        }
      }else{
        res.cookie('equinoxeyachts_language', 'en', { maxAge: 900000, httpOnly: true });
        res.setLocale("en");
        routes.views.yachtBrokerage(req,res)
      }

    });
    app.get('/vendita-yacht', function(req,res){
      if(req.cookies.equinoxeyachts_language){
        if(req.cookies.equinoxeyachts_language == "en"){
          res.redirect('/yacht-brokerage');
        }else{
          routes.views.yachtBrokerage(req,res)
        }
      }else{
        res.cookie('equinoxeyachts_language', 'it', { maxAge: 900000, httpOnly: true });
        res.setLocale("it");
        routes.views.yachtBrokerage(req,res)
      }

    });

    app.get('/yacht-charter', function(req,res){
      if(req.cookies.equinoxeyachts_language){
        if(req.cookies.equinoxeyachts_language == "it"){
          res.redirect('/noleggio-yacht-con-equipaggio');
        }else{
          routes.views.yachtCharter(req,res)
        }
      }else{
        res.cookie('equinoxeyachts_language', 'en', { maxAge: 900000, httpOnly: true });
        res.setLocale("en");
        routes.views.yachtCharter(req,res)
      }
    });
    app.get('/noleggio-yacht-con-equipaggio', function(req,res){
      if(req.cookies.equinoxeyachts_language){
        if(req.cookies.equinoxeyachts_language == "en"){
          res.redirect('/yacht_charter');
        }else{
          routes.views.yachtCharter(req,res)
        }
      }else{
        res.cookie('equinoxeyachts_language', 'it', { maxAge: 900000, httpOnly: true });
        res.setLocale("it");
        routes.views.yachtCharter(req,res)
      }

    });

    app.get('/expeditions-planning', function(req,res){
      if(req.cookies.equinoxeyachts_language){
        if(req.cookies.equinoxeyachts_language == "it"){
          res.redirect('/programma-spedizioni');
        }else{
          routes.views.expeditionsPlanning(req,res)
        }
      }else{
        res.cookie('equinoxeyachts_language', 'en', { maxAge: 900000, httpOnly: true });
        res.setLocale("en");
        routes.views.expeditionsPlanning(req,res)
      }

    });
    app.get('/programma-spedizioni', function(req,res){
      if(req.cookies.equinoxeyachts_language){
        if(req.cookies.equinoxeyachts_language == "en"){
          res.redirect('/expeditions-planning');
        }else{
          routes.views.expeditionsPlanning(req,res)
        }
      }else{
        res.cookie('equinoxeyachts_language', 'it', { maxAge: 900000, httpOnly: true });
        res.setLocale("it");
        routes.views.expeditionsPlanning(req,res)
      }

    });


    app.get('/bareboat', function(req,res){
      if(req.cookies.equinoxeyachts_language){
        if(req.cookies.equinoxeyachts_language == "it"){
          res.redirect('/noleggio-yacht-senza-equipaggio');
        }else{
          routes.views.bareboat(req,res)
        }
      }else{
        res.cookie('equinoxeyachts_language', 'en', { maxAge: 900000, httpOnly: true });
        res.setLocale("en");
        routes.views.bareboat(req,res)
      }

    });
    app.get('/noleggio-yacht-senza-equipaggio', function(req,res){
      if(req.cookies.equinoxeyachts_language){
        if(req.cookies.equinoxeyachts_language == "en"){
          res.redirect('/bareboat');
        }else{
          routes.views.bareboat(req,res)
        }
      }else{
        res.cookie('equinoxeyachts_language', 'it', { maxAge: 900000, httpOnly: true });
        res.setLocale("it");
        routes.views.bareboat(req,res)
      }

    });


    app.get('/services', function(req,res){
      if(req.cookies.equinoxeyachts_language){
        if(req.cookies.equinoxeyachts_language == "it"){
          res.redirect('/servizi');
        }else{
          routes.views.services(req,res)
        }
      }else{
        res.cookie('equinoxeyachts_language', 'en', { maxAge: 900000, httpOnly: true });
        res.setLocale("en");
        routes.views.services(req,res)
      }
    });
    app.get('/servizi', function(req,res){
      if(req.cookies.equinoxeyachts_language){
        if(req.cookies.equinoxeyachts_language == "en"){
          res.redirect('/services');
        }else{
          routes.views.services(req,res)
        }
      }else{
        res.cookie('equinoxeyachts_language', 'it', { maxAge: 900000, httpOnly: true });
        res.setLocale("it");
        routes.views.services(req,res)
      }

    });

    app.get('/heritage', function(req,res){
      if(req.cookies.equinoxeyachts_language){
        if(req.cookies.equinoxeyachts_language == "it"){
          res.redirect('/chi-siamo');
        }else{
          routes.views.heritage(req,res)
        }
      }else{
        res.cookie('equinoxeyachts_language', 'en', { maxAge: 900000, httpOnly: true });
        res.setLocale("en");
        routes.views.heritage(req,res)
      }

    });
    app.get('/chi-siamo', function(req,res){
      if(req.cookies.equinoxeyachts_language){
        if(req.cookies.equinoxeyachts_language == "en"){
          res.redirect('/heritage');
        }else{
          routes.views.heritage(req,res)
        }
      }else{
        res.cookie('equinoxeyachts_language', 'it', { maxAge: 900000, httpOnly: true });
        res.setLocale("it");
        routes.views.heritage(req,res)
      }

    });

    //API
    //app.get('/media/clean', middleware.requireUser, routes.views.mediaclean);
    app.get('/media/list', middleware.requireUser, routes.views.medialist);
    app.get('/media/backup', middleware.requireUser, routes.views.mediadownload);
    app.get('/media/generate/pdfLite', middleware.requireUser, routes.views.generatePDF);

    app.post('/api/mail/send', keystone.initAPI, routes.api.mail.send);
    app.post('/api/mail/yacht', keystone.initAPI, routes.api.mail.yacht);
    app.get('/api/pdf/full/:yacht', keystone.initAPI, routes.api.pdfFull);
    app.get('/api/pdf/lite/:yacht', keystone.initAPI, routes.api.pdfLite);
    app.get('/api/yachts/filter', keystone.initAPI, routes.api.yachts.filter);
    app.get('/api/yachts/search', keystone.initAPI, routes.api.yachts.search);
    // app.get('/api/expeditions/filter', keystone.initAPI, routes.api.expeditions.filter);

    app.get('/sitemap.xml', function(req, res) {
  		sitemap.create(keystone, req, res, { ignore: ['^\/api.*$', '^\/media.*$'] });
  	});
  	app.use(robots(__dirname + '/robots.txt'))

    // var options = {
    //     target: 'http://equinoxe.sailogy.com', // target host
    //     changeOrigin: true,               // needed for virtual hosted sites
    //     ws: true,                         // proxy websockets
    // };
    //
    // // create the proxy (without context)
    // var sailogyProxy = proxy(options);
    //
    // app.use('/noleggio-barche', sailogyProxy);



};
