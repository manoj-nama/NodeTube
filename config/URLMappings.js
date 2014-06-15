var controllers = {
	HomeController: require('../controllers/HomeController'),
	MediaController: require('../controllers/MediaController'),
	ConversionController: require('../controllers/ConversionController'),
	StaticServer: require("../utils/StaticFileServer")
};

exports.addRoutes = function (app) {

	app.get("/admin", controllers.StaticServer.admin);

	app.get("/home", controllers.HomeController.index);
	app.get("/media/cover/:id", controllers.MediaController.cover);
	app.get("/media/stream/:id", controllers.MediaController.stream);
	
	app.post("/media/upload", controllers.MediaController.uploadMedia);
	app.post("/media/list", controllers.MediaController.list);
};