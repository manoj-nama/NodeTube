var controllers = {
	HomeController: require('../controllers/HomeController'),
	ConversionController: require('../controllers/ConversionController')
};

exports.addRoutes = function (app) {
	app.get("/home", controllers.HomeController.index);
}