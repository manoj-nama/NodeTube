

exports.uploadMedia = function (req, res) {
	MediaService.uploadMedia(req.files)
		.on("ERROR", function (err) {
			res.sendErrorResponse(err);
			req.files = {};
		})
		.on("DONE", function (resp) {
			res.sendSuccessResponse(resp);
			req.files = {};
		});
}

exports.cover = function (req, res) {
	console.log(req.params);
	res.sendfile(_appBaseDir + _config.conversion.framesPath + req.params.id + "_cover.jpg");
};