var express = require('express');
var appRouter = require("./config/URLMappings");
var logger = require("morgan");
var AppBuilder = require("./custom_modules/AppBuilder");
var bodyParser = require("body-parser");
var multipart = require('connect-multiparty')();
var path = require("path");

var app = express();
app.use(logger('dev'));
app.use(bodyParser());
app.use(multipart);
app.use(AppBuilder.apiHelperToolInjectionMiddleware);

GLOBAL._appBaseDir = __dirname;
GLOBAL._views = path.join(__dirname, "views");
GLOBAL.__appEnv = process.env.NODE_ENV || "development";

AppBuilder.initConfig({
    postProcess: function (config) {
        config.port = process.env.PORT || config.port;
        return config;
    }
});

AppBuilder.initDomains(function () {
	AppBuilder.initServices();

	require("./config/Bootstrap.js").init();
});

appRouter.addRoutes(app);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 8888, function () {
    console.log("Server Listening on port", process.env.PORT || 8888);
});

