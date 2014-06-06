var ffmpeg = require("fluent-ffmpeg");
var crypto = require('crypto');

exports.convert = function (options) {
	var meta = ffmpeg.Metadata;
	var inputFile = options.inputFile;

	var convertedWidth = options.convertedWidth || "?";
	var convertedHeight = options.convertedHeight || "480";

	var inputFileName = crypto.createHash('SHA').update(inputFile + (+new Date())).digest('hex');
	inputFileName+= options.toFormat || "mp4";
	 
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
		})
		.saveToFile(_appBaseDir + "/conversion/" + inputFileName)
	});
}

exports.getSnapshots = function (inputFile, count, timemarks) {
	var ff = new ffmpeg({source: inputFile});
	ff.on('start', function () {
		console.log("Starting snapshots");
	})
	.on('end', function () {
		console.log("Successfully taken snapshots");
	})
	.takeScreenshots(
		{
		   count: count,
		   timemarks: timemarks,
		   filename: '%b-thumbnail-%i-%r'
		},
      _appBaseDir + '/frames'
	);
}

