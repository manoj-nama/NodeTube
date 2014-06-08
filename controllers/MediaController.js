

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