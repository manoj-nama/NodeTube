var fs = require('fs');
var mkdirp = require('mkdirp');
var crypto = require('crypto');
var UtilController = require("../controllers/UtilController");
var extend = require("extend");
var async = require("async");

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
                                    exports.convertDefaults(outputDir, fileNameToSend);
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

exports.convertDefaults = function (outputDir, mediaId) {
    var formats = {};
    formats["mp4"] = {audio: "libvo_aacenc", video: "mpeg4"};
    formats["ogg"] = {audio: "libvorbis", video: "libtheora"};
    formats["webm"] = {audio: "libvorbis", video: "libvpx"};
    var tasks = [];
    for(var key in formats) {
        if(formats.hasOwnProperty(key)) {
            (function (key) {
                tasks.push(function (cb) {
                    var options = {};
                    options["inputFile"] = outputDir + "/" + mediaId;
                    options["outputFileName"] = outputDir + "/" + mediaId + "_" + key;
                    options["videoCodec"] = formats[key].video;
                    options["audioCodec"] = formats[key].audio;
                    options["toFormat"] = key;

                    //save initial batch of pending conversions
                    Media.update({mediaId: mediaId}, {
                        $push: {
                            conversions: {
                                format: options.toFormat,
                                timestampAdded: +new Date()
                            }
                        }
                    }, function (err, updateCount) {
                        if(err) {
                            console.log("Error adding conversion to DB", err);
                        } else {
                            console.log("Added pending conversion to DB for media", mediaId, options.toFormat);
                        }
                    });

                    ConversionService.convert(options)
                        .on(events.DONE, function (resp) {
                            console.log("CONVERSION SUCCESSFULL", mediaId, resp);
                            globalEvent.emit("ConversionFinished", mediaId, "auto", key);
                            cb(null, {
                                format: options.toFormat,
                                timestampConverted: +new Date(),
                                status: "complete"
                            });
                        })
                        .on(events.ERROR, function (err) {
                            console.log("ERROR WHILE CONVERSION", mediaId, err);
                            cb(err, null);
                        });
                });
            })(key);
        }
    }

    async.parallel(tasks, function (err, resp) {
        if(err) {
            console.log("----------------------------------------------------------");
            console.log("DEFAULT CONVERSION ABORTED");
            console.log(err);
            console.log("----------------------------------------------------------");
        } else {
            console.log("----------------------------------------------------------");
            console.log("DEFAULT CONVERSION FINISHED");
            console.log(resp);
            console.log("----------------------------------------------------------");
        }
    });
};

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