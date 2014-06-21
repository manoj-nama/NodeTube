var express = require('express');
var appRouter = require("./config/URLMappings");
var logger = require("morgan");
var AppBuilder = require("./custom_modules/AppBuilder");
var bodyParser = require("body-parser");
var multipart = require('connect-multiparty')();
var path = require("path");
var httpServer = require("http").Server;
var events = require("./utils/Events");
var io = require("socket.io");

var app = express();

//Include Socket IO Connections
httpServer = httpServer(app);

app.use(logger('dev'));
app.use(bodyParser());
app.use(multipart);
app.use(AppBuilder.apiHelperToolInjectionMiddleware);

GLOBAL._appBaseDir = __dirname;
GLOBAL._views = path.join(__dirname, "views");
GLOBAL.events = events;
GLOBAL.__appEnv = process.env.NODE_ENV || "development";

AppBuilder.initConfig({
    postProcess: function (config) {
        config.port = process.env.PORT || config.port;
        return config;
    }
});

appRouter.addRoutes(app);

app.use(express.static(path.join(__dirname, 'public')));

AppBuilder.initDomains(function () {

    AppBuilder.initHooks();
	AppBuilder.initServices();

	require("./config/Bootstrap.js").init();

    var options = {
        transports: ["websocket", "xhr-polling", "jsonp-polling"]
    };
    httpServer.listen(process.env.PORT || 8888, function () {
        console.log("Server Listening on port", process.env.PORT || 8888);
        globalEvent.emit("SocketIOStarted", io(httpServer, options));
    });
});


