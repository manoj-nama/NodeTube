var fs = require('fs');
var crypto = require('crypto');

exports.uploadMedia = function (file) {
	var emitter = this;
	var mediaPath = _appBaseDir + _config.common.conversion.mediaPath;
	if(file) {
		fs.readFile(file.media.path, function (err, data) {
			var fileNameToSend = crypto.createHash('SHA').update(file.media.originalFilename + (+new Date())).digest('hex');
			var fname = fileNameToSend + file.media.originalFilename.replace(/(.*)(\..+)/, function(a, b, c) { return c; });
			fs.writeFile(mediaPath + fname, data, function (err, resp) {
				if(!err) {
					ConversionService.getSnapshots(mediaPath + fname, 1, ['10'], fileNameToSend + "_cover")
						.on("DONE", function (snaps) {
							emitter.emit("DONE", {fileName: fname, screens: snaps});
						})
						.on("ERROR", function(err) {
							console.log(">>>>>>>>>>>>", err)
							emitter.emit("ERROR", "Cannot get Snaps");		
						});
				} else {
					emitter.emit("ERROR", "Error reading file");
				}
			});
		});
	} else {
		emitter.emit("ERROR", "no file");
	}
}.toEmitter();