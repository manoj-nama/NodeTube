var ffmpeg = require("fluent-ffmpeg");
// var meta = ffmpeg.Metadata;
// var inputFile = "test.avi";

// var convertedWidth = "?";
// var convertedHeight = "480";
 
// meta(inputFile, function(data) {
//     console.log(data.video);
//     var size = data.video.resolution.w + "x" + data.video.resolution.h;
//     var ff = new ffmpeg({source: inputFile});
//     var progressObj = {};
//     var progressPatt = "";

//     console.time("ST");

//     ff.withSize(convertedWidth + "x" + convertedHeight)
//     .withVideoBitrate(data.video.bitrate)
//     .withVideoCodec('mpeg4')
//     .withAudioBitrate('128k')
//     .withAudioCodec('libvo_aacenc')
//     .withAudioChannels(2)
//     .toFormat("mp4")
//     .on('start', function() {
//         console.log('starting...');
//     })
//     .on('error', function(err) {
//         console.log('An error occurred: ' + err.message);
//     })
//     .on('codecData', function(data) {
//         console.log('Codec: ', data);
//     })
//     .on('progress', function(progress) {
//         var p = Math.round(progress.percent);
//         //   - \r for linux, and for windows - \033[0G 
//         if(!progressObj.hasOwnProperty(p)) {
//             progressObj[p] = progress.percent;
//             progressPatt += "|";
//             process.stdout.write(progressPatt + " - " + p + "%\033[0G");
//         }
//     })
//     .on('end', function(filenames) {
//         console.log();
//         console.timeEnd("ST");
//         console.log('Conversion Successfull.');
//     })
//     .saveToFile("./frames/targetFile.mp4")
//     // ff.takeScreenshots(
//     //     {
//     //         count: 4,
//     //         timemarks: [ '1', '50', '100', '150' ],
//     //         filename: '%b-thumbnail-%i-%r'
//     //     },
//     //     './frames'
//     // );

// });