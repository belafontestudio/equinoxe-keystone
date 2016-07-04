var _ = require('underscore'),
	querystring = require('querystring'),
	keystone = require('keystone');

exports.menu = function(req, res, next) {
	locals = res.locals;
	locals.navLinks = [
		{ label: req.__("menu1"),		key: req.__("menu1"),   id: "m0",		href: req.__("url1") },
		{ label: req.__("menu2"),		key: req.__("menu2"),   id: "m1",		href: req.__("url2") },
		{ label: req.__("menu3"),		key: req.__("menu3"),   id: "m2",		href: req.__("url3") },
		{ label: req.__("menu4"),		key: req.__("menu4"),   id: "m4",		href: req.__("url4") },
		{ label: req.__("menu5"),		key: req.__("menu5"),   id: "m5",		href: req.__("url5") },
		// { label: 'Berths',		key: 'berths',   id: "m8",		href: '/berths' },
		{ label: req.__("menu6"),		key: req.__("menu6"),   id: "m6",		href: req.__("url6") },
		{ label: req.__("menu7"),		key: req.__("menu7"),   id: "m7",		href: req.__("url7") },
	];
  next();
};

exports.language = function(req, res, next) {

  var domain = req.get('host');
  console.log(domain);


	switch(domain){
		case "equinoxe.it":
    case "localhost:3000":
		case "equinoxeyachts.it":
		case "www.equinoxe.it":
		case "www.equinoxeyachts.it":
			res.cookie('equionoxeyachts_language', 'it', { maxAge: 900000, httpOnly: true });
			console.log("it");
		break;
		case "equinoxeyachts.com":
		case "www.equinoxeyachts.com":
			res.cookie('equionoxeyachts_language', 'en', { maxAge: 900000, httpOnly: true });
			console.log("en");
		break;
	}
  next();

};
