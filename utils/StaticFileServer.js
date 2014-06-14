var path = require("path");

exports.admin = function (req, res) {
	res.sendfile(path.join(_views, "admin.html"));
};