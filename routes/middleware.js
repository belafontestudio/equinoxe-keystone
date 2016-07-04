/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */

var _ = require('underscore'),
	querystring = require('querystring'),
	keystone = require('keystone');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/

exports.initLocals = function(req, res, next) {
	var locals = res.locals;

	locals.navLinks = [
		{ label: req.__("menu1"),		key: req.__("menu1"),   id: "m0",		href: req.__("url2") },
		{ label: req.__("menu2"),		key: req.__("menu2"),   id: "m1",		href: req.__("url2") },
		{ label: req.__("menu3"),		key: req.__("menu3"),   id: "m2",		href: req.__("url3") },
		{ label: req.__("menu4"),		key: req.__("menu4"),   id: "m4",		href: req.__("url4") },
		{ label: req.__("menu5"),		key: req.__("menu5"),   id: "m5",		href: req.__("url5") },
		// { label: 'Berths',		key: 'berths',   id: "m8",		href: '/berths' },
		{ label: req.__("menu6"),		key: req.__("menu6"),   id: "m6",		href: req.__("url6") },
		{ label: req.__("menu7"),		key: req.__("menu7"),   id: "m7",		href: req.__("url7") },
	];

	locals.user = req.user;

	next();

};


/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {

	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};

	res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length; }) ? flashMessages : false;

	next();

};


/**
	Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function(req, res, next) {

	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}

};
