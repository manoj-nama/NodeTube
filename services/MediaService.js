var fs = require('fs');
var mkdirp = require('mkdirp');
var crypto = require('crypto');
var UtilController = require("../controllers/UtilController");

exports.uploadMedia = function (file) {
	var emitter = this;
	var mediaPath = _appBaseDir + _config.conversion.mediaPath;
	if(file) {
		fs.readFile(file.media.path, function (err, data) {
			var fileNameToSend = crypto.createHash('SHA').update(file.media.originalFilename + (+new Date())).digest('hex');
			var outputDir = mediaPath + fileNameToSend;
			mkdirp.sync(outputDir);
			var fname = outputDir + "/" + fileNameToSend;
			fs.writeFile(fname, data, function (err, resp) {
				if(!err) {
					var options = {
						inputFile: fname,
						count: 1,
						timemarks: ["30"],
						outputFileNaming: fileNameToSend + "_cover",
						outputDir: outputDir,
						size: "480x?"
					};
					ConversionService.getSnapshots(options)
						.on(events.DONE, function (snaps) {
							var m = new Media({
								mediaId: fileNameToSend,
								timestampAdded: +new Date(),
								description: {
									title: fileNameToSend
								}
							}).save(function(err, resp) {
								if(err) {
									emitter.emit(events.ERROR, "Could not save Media");
								} else {
									emitter.emit(events.DONE, {fileId: fileNameToSend});
								}
							});
						})
						.on(events.ERROR, function(err) {
							emitter.emit(events.ERROR, "Cannot get Snaps");
						});
				} else {
					emitter.emit(events.ERROR, "Error reading file");
				}
			});
		});
	} else {
		emitter.emit(events.ERROR, "no file");
	}
}.toEmitter();

exports.list = function (skip, limit, query, projection) {
	var emitter = this;
	Media.find(query, projection, {skip: skip, limit: limit}, function (err, docs) {
		if(err) {
			emitter.emit(events.ERROR, err);
		} else {
			emitter.emit(events.DONE, docs);
		}
	});
}.toEmitter();

exports.get = function (mediaId) {
	var emitter = this;
	Media.findOne({mediaId: mediaId}, function (err, media) {
		if(err) {
			emitter.emit(events.ERROR, err);
		} else {
			emitter.emit(events.DONE, media);
		}
	});
}.toEmitter();


exports.delete = function (mediaId) {
    var emitter = this;
    var mediaPath = _appBaseDir + _config.conversion.mediaPath;
    Media.remove({mediaId: mediaId}, function (err, resp) {
        if(err) {
            emitter.emit(events.ERROR, err);
        } else {
            UtilController.deleteFolder(mediaPath + mediaId);
            emitter.emit(events.DONE, resp);
        }
    });
}.toEmitter();