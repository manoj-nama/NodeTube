

exports.uploadMedia = function (req, res) {
	MediaService.uploadMedia(req.files)
		.on(events.ERROR, function (err) {
			res.sendErrorResponse(err);
			req.files = {};
		})
		.on(events.DONE, function (resp) {
			res.sendSuccessResponse(resp);
			req.files = {};
		});
}

exports.cover = function (req, res) {
	res.sendfile(_appBaseDir + _config.conversion.mediaPath + req.params.id + "/" + req.params.id + "_cover.jpg");
};

exports.stream = function (req, res) {
	res.sendfile(_appBaseDir + _config.conversion.mediaPath + req.params.id + "/" + req.params.id);
};

exports.list = function (req, res) {
	var query = req.body.query || {};
	var projection = req.body.projection || {};
	MediaService.list(req.body.skip, req.body.limit, query, projection)
		.on(events.ERROR, function (err) {
			res.sendErrorResponse(err);
		})
		.on(events.DONE, function (resp) {
			res.sendSuccessResponse(resp);
		});
};

exports.delete = function (req, res) {
    var mediaId = req.params.mediaId;
    if(mediaId) {
        MediaService.delete(mediaId)
            .on(events.ERROR, function (err) {
                res.sendErrorResponse(err);
            })
            .on(events.DONE, function (resp) {
                res.sendSuccessResponse(resp);
            });
    } else {
        res.sendErrorResponse({error: "Invalid MediaId Supplied"});
    }
};

exports.get = function (req, res) {
    var mediaId = req.params.mediaId;
    if(mediaId) {
        MediaService.get(mediaId)
            .on(events.ERROR, function (err) {
                res.sendErrorResponse(err);
            })
            .on(events.DONE, function (resp) {
                res.sendSuccessResponse(resp);
            });
    } else {
        res.sendErrorResponse({error: "Invalid MediaId Supplied"});
    }
};