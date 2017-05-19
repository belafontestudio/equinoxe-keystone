var keystone = require('keystone'),
http = require('http'),
fs = require('fs'),
path = require('path');

root = process.env.CLOUD_DIR;

var keystone = require('keystone');


exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	// Set locals
	
	locals.filters = {
		file: req.params.file
	};

	

	// Load the current post
	view.on('init', function(next) {

			var filePath1 = process.env.CLOUD_DIR+"/generated/pdf/full/"+locals.filters.file; 
			var filePath2 = process.env.CLOUD_DIR+"/generated/pdf/lite/"+locals.filters.file; 
			var filePath3 = process.env.CLOUD_DIR+"/generated/pdf/full-no-logo/"+locals.filters.file; 
			var filePath4 = process.env.CLOUD_DIR+"/generated/pdf/lite-no-logo/"+locals.filters.file; 

			fs.stat(filePath1, function (err, stats) {
			   // console.log(stats);//here we got all information of file in stats variable

			   if (err) {
			       return next(err);
			   }

			   fs.unlink(filePath1,function(err){
			        if(err) return console.log(err);
			        console.log('file deleted successfully');
			   });  
			});
			fs.stat(filePath2, function (err, stats) {
			   // console.log(stats);//here we got all information of file in stats variable

			   if (err) {
			       return console.log(err);
			   }

			   fs.unlink(filePath2,function(err){
			        if(err) return console.log(err);
			        console.log('file deleted successfully');
			   });  
			});
			fs.stat(filePath3, function (err, stats) {
			   // console.log(stats);//here we got all information of file in stats variable

			   if (err) {
			       return console.log(err);
			   }

			   fs.unlink(filePath3,function(err){
			        if(err) return console.log(err);
			        console.log('file deleted successfully');
			   });  
			});
			fs.stat(filePath4, function (err, stats) {
			   // console.log(stats);//here we got all information of file in stats variable

			   if (err) {
			       return console.log(err);
			   }

			   fs.unlink(filePath4,function(err){
			        if(err) return console.log(err);
			        console.log('file deleted successfully');
			   });  
			});
		
			
			
			
			res.end(filePath1+" "+filePath2+" "+filePath3+" "+filePath4+" deleted");


	});



	// Render the view
	view.render('fileDelete');

};
