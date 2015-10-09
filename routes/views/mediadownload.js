http = require('http');
fs = require('fs');
path = require('path');
var archiver = require('archiver');

root = process.env.CLOUD_DIR;
temp = process.env.TEMP_DIR

var keystone = require('keystone');
var archive = archiver('zip');
var output = fs.createWriteStream(temp + '/backup.zip');

output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;

	view.on('init', function(next) {

		archive.directory(process.env.CLOUD_DIR);
		archive.pipe(output);
		archive.finalize();




		next();

	});



	// Render the view
	view.render('mediadownload');

};
