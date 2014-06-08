var controllers = {
	HomeController: require('../controllers/HomeController'),
	MediaController: require('../controllers/MediaController'),
	ConversionController: require('../controllers/ConversionController')
};

exports.addRoutes = function (app) {
	app.get("/home", controllers.HomeController.index);
	app.post("/media/upload", controllers.MediaController.uploadMedia);
}