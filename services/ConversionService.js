var ffmpeg = require("fluent-ffmpeg");
var crypto = require('crypto');

exports.convert = function (options) {
	var emitter = this;
	var meta = ffmpeg.Metadata;
	var inputFile = options.inputFile;

	var convertedWidth = options.convertedWidth || "?";
	var convertedHeight = options.convertedHeight || "480";

	var inputFileName = crypto.createHash('SHA').update(inputFile + (+new Date())).digest('hex');
	inputFileName += ("." + (options.toFormat || "mp4"));
	 
	meta(inputFile, function(data) {
		var size = data.video.resolution.w + "x" + data.video.resolution.h;
		var ff = new ffmpeg({source: inputFile});
		var progressObj = {};

		ff.withSize(convertedWidth + "x" + convertedHeight)
		.withVideoBitrate(data.video.bitrate)
		.withVideoCodec(options.videoCodec || 'mpeg4')
		.withAudioBitrate(options.audioBitrate || '128k')
		.withAudioCodec(options.audioCode || 'libvo_aacenc')
		.withAudioChannels(options.audioChannels || 2)
		.toFormat(options.toFormat || "mp4")
		.on('start', function() {
			console.log('starting...');
		})
		.on('error', function(err) {
			console.log('An error occurred: ' + err.message);
			emitter.emit("ERROR", err);
		})
		.on('codecData', function(data) {
			console.log('Codec: ', data);
		})
		.on('progress', function(progress) {
			var p = Math.round(progress.percent);
			if(!progressObj.hasOwnProperty(p)) {
			   progressObj[p] = progress.percent;
			   process.stdout.write(options.inputFile + " ==> " + p + "%\033[0G");
			}
		})
		.on('end', function(filenames) {
			console.log();
			console.log(options.inputFile, 'Conversion Successful.');
			emitter.emit("DONE", filenames);
		})
		.saveToFile(_appBaseDir  + _config.conversion.mediaPath + inputFileName)
	});
}.toEmitter();

exports.getSnapshots = function (options) {
	var emitter = this;

	var ff = new ffmpeg({source: options.inputFile});

	ff.withSize(options.size || "480x?")
	.on('start', function () {
		console.log("Starting snapshots");
	})
	.on('end', function (filenames) {
		console.log("Successfully taken snapshots", filenames.join(", "));
		emitter.emit("DONE", filenames);
	})
	.on('error', function(err) {
		console.log('An error occurred: ' + err.message);
		emitter.emit("ERROR", err);
	})
	.takeScreenshots(
		{
		   count: options.count,
		   timemarks: options.timemarks,
		   filename: options.outputFileNaming
		},
      _appBaseDir + _config.conversion.framesPath
	);

}.toEmitter();

