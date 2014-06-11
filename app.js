var express = require('express');
var appRouter = require("./config/URLMappings");
var logger = require("morgan");
var AppBuilder = require("./custom_modules/AppBuilder");
var bodyParser = require("body-parser");
var multipart = require('connect-multiparty')();

var app = express();
app.use(logger('dev'));
app.use(bodyParser());
app.use(multipart);
app.use(AppBuilder.apiHelperToolInjectionMiddleware);

GLOBAL._appBaseDir = __dirname;
GLOBAL.__appEnv = process.env.NODE_ENV || "development";

AppBuilder.initConfig({
    postProcess: function (config) {
        config.port = process.env.PORT || config.port;
        return config;
    }
});

AppBuilder.initDomains(function () {
	AppBuilder.initServices();
});

appRouter.addRoutes(app);

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 8888, function () {
    console.log("Server Listening on port", process.env.PORT || 8888);
});

