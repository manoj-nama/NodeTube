exports.list = function (req, res) {
    var query = req.body.query || {};
    var projection = req.body.projection || {};
    UserService.list(req.body.skip, req.body.limit, query, projection)
        .on("ERROR", function (err) {
            res.sendErrorResponse(err);
        })
        .on("DONE", function (resp) {
            res.sendSuccessResponse(resp);
        });
};