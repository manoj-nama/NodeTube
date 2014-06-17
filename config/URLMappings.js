var controllers = {
	HomeController: require('../controllers/HomeController'),
	MediaController: require('../controllers/MediaController'),
	ConversionController: require('../controllers/ConversionController'),
    UtilController: require("../controllers/UtilController"),
    StaticServer: require("../utils/StaticFileServer")
};

exports.addRoutes = function (app) {

	app.get("/admin", controllers.StaticServer.admin);

	app.get("/home", controllers.HomeController.index);
	app.get("/media/cover/:id", controllers.MediaController.cover);
	app.get("/media/stream/:id", controllers.MediaController.stream);

    app.get("/settings/config", controllers.UtilController.config);
    app.get("/settings/appconfig", controllers.UtilController.AppConfig);

	app.post("/media/upload", controllers.MediaController.uploadMedia);
	app.post("/media/list", controllers.MediaController.list);
};