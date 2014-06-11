var controllers = {
	HomeController: require('../controllers/HomeController'),
	MediaController: require('../controllers/MediaController'),
	ConversionController: require('../controllers/ConversionController')
};

exports.addRoutes = function (app) {
	app.get("/home", controllers.HomeController.index);
	app.get("/media/cover/:id", controllers.MediaController.cover);
	
	app.post("/media/upload", controllers.MediaController.uploadMedia);
	app.post("/media/list", controllers.MediaController.list);
}