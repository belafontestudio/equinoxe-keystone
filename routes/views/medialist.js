http = require('http');
// fs = require('fs');
// path = require('path');
// var dir = require('node-dir');
root = process.env.CLOUD_DIR;

var keystone = require('keystone');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;

	view.on('init', function(next) {
		
		// var response = '<pre>FILES IN ' + process.env.CLOUD_DIR + ': \n';
		// response += '------------------\n\n';
		// var counter = 0

		// var readDir = function (dpath) {
		// 	var filenames = fs.readdirSync(dpath);
		// 	filenames.forEach(function (filename) {
		// 		var thePath = path.join(dpath, filename);
		// 		if (fs.lstatSync(thePath).isDirectory()) {
		// 			response += '\n\n' + thePath.toUpperCase() + '\n';
		// 			response += '\n';
		// 			readDir(thePath);
		// 		} else {
		// 			response += filename + '\n';
		// 		}
		// 		counter++;
		// 	});
		// };

		// readDir(root);
		// response += '\n\n------------------\n\n';
		// response += "TOTAL FILES "+counter; 
		// var response = '<pre>FILES IN ' + process.env.CLOUD_DIR + ': \n';
		// response += '------------------\n\n';
		// dir.paths(process.env.CLOUD_DIR, true, function(err, paths) {
		//     if (err) throw err;
		//     response += 'paths:\n'+paths;
		//     res.end(response);
		// });

			
			
		});

		
	
	// Render the view
	view.render('medialist');
	
};	