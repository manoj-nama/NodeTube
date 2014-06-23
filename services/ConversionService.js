var ffmpeg = require("fluent-ffmpeg");
var crypto = require('crypto');

exports.convert = function (options) {
	var emitter = this;
	var inputFile = options.inputFile;
    var outputFileName = options.outputFileName;

	var convertedWidth = options.convertedWidth || "?";
	var convertedHeight = options.convertedHeight || "480";
    var convertedSize = convertedWidth + "x" + convertedHeight;
    var format = options.toFormat || "mp4";

	ffmpeg.ffprobe(inputFile, function(err, data) {
		var size = data.streams[0].width + "x" + data.streams[0].height;
		var ff = new ffmpeg({source: inputFile});
		var progressObj = {};

		ff.withSize(convertedSize || size)
		.withVideoBitrate(data.streams[0].bit_rate)
		.withVideoCodec(options.videoCodec || 'mpeg4')
		.withAudioCodec(options.audioCodec || 'libvo_aacenc')
		.toFormat(format)
		.on('start', function() {
			console.log('starting conversion', format ,"...");
		})
		.on('error', function(err) {
			console.log('An error occurred: ' + err.message);
			emitter.emit(events.ERROR, err);
		})
		.on('codecData', function(data) {
			console.log('Codec: ', data);
		})
		.on('progress', function(progress) {
			var p = Math.round(progress.percent);
			if(!progressObj.hasOwnProperty(p)) {
			   progressObj[p] = progress.percent;
			   process.stdout.write(format + " ==> " + p + "%\033[0G");
			}
		})
		.on('end', function(filenames) {
			console.log();
			console.log(options.inputFile, 'Conversion Successful.');
			emitter.emit(events.DONE, filenames);
		})
		.saveToFile(outputFileName)
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
		emitter.emit(events.DONE, filenames);
	})
	.on('error', function(err) {
		console.log('An error occurred: ' + err.message);
		emitter.emit(events.ERROR, err);
	})
	.takeScreenshots(
		{
		   count: options.count,
		   timemarks: options.timemarks,
		   filename: options.outputFileNaming
		},
      	options.outputDir
	);

}.toEmitter();

