var async = require('async'),
	keystone = require('keystone');
var sendgrid = require("sendgrid").mail;





exports.send = function(req, res) {
	var locals = res.locals;
	locals.filters = {
		to: req.query.t,
		email: req.query.e,
		name: req.query.n,
		surname: req.query.s,
		mail_text: req.query.m
	};

	var from_email = new sendgrid.Email(locals.filters.email);
	var to_email = new sendgrid.Email(locals.filters.to);
	var subject = locals.filters.name +" "+ locals.filters.surname +' - website';
	var content = new sendgrid.Content('text/plain', locals.filters.mail_text);
	var mail = new sendgrid.Mail(from_email, subject, to_email, content);

	var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
	var request = sg.emptyRequest({
	  method: 'POST',
	  path: '/v3/mail/send',
	  body: mail.toJSON(),
	});

sg.API(request, function(error, response) {
	res.apiResponse({
		err: error,
		res: response
	});
});

};
exports.yacht = function(req, res) {
	var locals = res.locals;
	locals.filters = {
		to: req.query.t,
		email: req.query.e,
		name: req.query.n,
		surname: req.query.s,
		mail_text: req.query.m,
		theyacht: req.query.y
	};

	var from_email = new sendgrid.Email(locals.filters.email);
	var to_email = new sendgrid.Email(locals.filters.to);
	var subject = locals.filters.theyacht+ " - "+locals.filters.name +" "+ locals.filters.surname +' - website';
	var content = new sendgrid.Content('text/plain', locals.filters.mail_text);
	var mail = new sendgrid.Mail(from_email, subject, to_email, content);

	var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
	var request = sg.emptyRequest({
	  method: 'POST',
	  path: '/v3/mail/send',
	  body: mail.toJSON(),
	});

sg.API(request, function(error, response) {
	res.apiResponse({
		err: error,
		res: response
	});
});

};
