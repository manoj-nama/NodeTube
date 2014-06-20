var controllers = {
	HomeController: require('../controllers/HomeController'),
	MediaController: require('../controllers/MediaController'),
	UserController: require('../controllers/UserController'),
	ConversionController: require('../controllers/ConversionController'),
    UtilController: require("../controllers/UtilController"),
    StaticServer: require("../utils/StaticFileServer")
};

exports.addRoutes = function (app) {

    //HOME - COMMON
	app.get("/admin", controllers.StaticServer.admin);
	app.get("/home", controllers.HomeController.index);

    //SETTINGS
    app.get("/settings/config", controllers.UtilController.config);

    app.get("/settings/appconfig", controllers.UtilController.AppConfig);
    //AUTH
    app.get("/auth/login/:service", controllers.UserController.login);

    //MEDIA
    app.get("/media/cover/:id", controllers.MediaController.cover);
    app.get("/media/stream/:id", controllers.MediaController.stream);
    app.post("/media/upload", controllers.MediaController.uploadMedia);
    app.post("/media/list", controllers.MediaController.list);
    app.get("/media/:mediaId", controllers.MediaController.get);
    app.delete("/media/:mediaId", controllers.MediaController.delete);

    //USERS
    app.get("/users/:userId", controllers.UserController.get);
    app.delete("/users/:userId", controllers.UserController.delete);
    app.put("/users/:userId", controllers.UserController.update);
    app.post("/users/list", controllers.UserController.list);
};