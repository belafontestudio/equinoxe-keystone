
http = require('http');
fs = require('fs');
path = require('path');

root = process.env.CLOUD_DIR;

var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	view.on('init', function(next) {
		
		var deleteDir = function (dpath) {
			var filenames = fs.readdirSync(dpath);
			filenames.forEach(function (filename) {
				var thePath = path.join(dpath, filename);
				if (fs.lstatSync(thePath).isDirectory()) {
					deleteDir(thePath);
					fs.rmdirSync(thePath);
				} else {
					fs.unlinkSync(thePath);
				}
			});
			
		};

		deleteDir(root);

		res.end('All media file cleared.');
		 


		locals.data = {
		yachts: response
		};
		
	});
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'clean';
	

		
	
	// Render the view
	view.render('mediaclean');
	
};