
exports.config = function (req, res) {
    res.sendSuccessResponse(__rawConfig);
};

exports.AppConfig = function (req, res) {
    res.sendSuccessResponse(__rawAppConfig);
};