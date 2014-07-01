var fs = require('fs');
var path = require('path');
var MongoDatabaseProvider = require("./modules/MongoDatabaseProvider");
var ConfigManager = require("./modules/ConfigManager");


exports.initConfig = function (options) {
    new ConfigManager(options, function (config) {
        Object.defineProperty(global, '_config', {
            get: function () {
                return config;
            }
        });
    });
};

//Init all database Models
exports.initDomains = function (callback) {
    MongoDatabaseProvider.getDatabase(function (db) {
        Object.defineProperty(global, '_db', {
            get: function () {
                return db;
            }
        });
        fs.readdir(path.join(_appBaseDir, "domains"), function (err, list) {
            if (err) log.error(err);
            else {
                list.forEach(function (item) {
                    var name = item.toString().replace(/\.js$/, "");
                    var model = db.getDomain(name);
                    model.ensureAllManuallyDefinedSchemaIndexes();
                    Object.defineProperty(global, name, {
                        get: function () {
                            return model;
                        }
                    });
                });
            }
            callback();
        });
    });
};

//Enable global app event hooks
exports.initHooks = function () {
    try {
        global.globalEvent = new process.EventEmitter();
        var list = fs.readdirSync(path.join(_appBaseDir, "hooks"));
        list.forEach(function (item) {
            var name = item.toString().replace(/\.js$/, "");
            var hook = require(path.join(_appBaseDir, "hooks", name));
            if (typeof(hook.onEvent) == 'function') {
                global.globalEvent.on(name, hook.onEvent);
            } else {
                log.error(new Error("Hook: [" + item + "] is invalid. Please define a function named 'onEvent' in the Hook file. This function will be called on event."));
            }
        });
    } catch (err) {
        log.error(err);
    }
};

exports.initServices = function () {
    try {
        var list = fs.readdirSync(path.join(_appBaseDir, "services"));
        list.forEach(function (item) {
            var name = item.toString().replace(/\.js$/, "");
            var service = require(path.join(_appBaseDir, "services", name));
            Object.defineProperty(global, name, {
                get: function () {
                    return service;
                }
            });
        });
    } catch (err) {
        console.log(err);
    }
};


exports.apiHelperToolInjectionMiddleware = function (req, res, next) {
    function sendResponse(dataObj, headers, status) {
        if (Boolean(status)) status = parseInt(status, 10);
        else status = 200;
        headers = headers || {};
        dataObj["status"] = status;
        headers["Content-Type"] = Boolean(req.param('callback')) ? 'text/javascript' : 'application/json';
        res.writeHead(status, headers);
        if (Boolean(req.param('callback'))) {
            res.end(req.param('callback') + "(" + JSON.stringify(dataObj) + ")");
        } else {
            res.end(JSON.stringify(dataObj));
        }
    }

    res.sendErrorResponse = function (message, status, headers) {
        sendResponse({
            error: message
        }, headers, status);
    };
    res.sendSuccessResponse = function (data, status, headers) {
        if (typeof(data) == 'string' || data instanceof String) {
            data = {message: data};
        }
        sendResponse(data, headers, status);
    };
    req.setDefaultParams = function (map) {
        Object.keys(map).forEach(function (key) {
            if (req.param(key) == null || typeof(req.param(key)) == 'undefined') req.params[key] = map[key] + "";
        });
    };
    next();
};

//Register the health of cluster worker in db
exports.registerClusterWorker = function () {
    setInterval((function (fn) {
        fn();
        return fn;
    })(function () {
        var os = require("os");
        var details = {
            workerId: _workerId,
            environment: __appEnv,
            processName: process.title,
            versions: process.versions,
            architecture: process.arch,
            platform: process.platform,
            environmentVariables: process.env,
            pid: process.pid,
            features: process.features,
            debugPort: process.debugPort,
            listeningPort: _app.get('port'),
            nodeFilePath: process.execPath,
            processConfig: process.config,
            hostname: os.hostname(),
            uptime: os.uptime(),
            ram: {
                free: os.freemem(),
                total: os.totalmem()
            },
            cpus: os.cpus(),
            osType: {
                name: os.type(),
                release: os.release(),
                arch: os.arch()
            },
            networkInterfaces: os.networkInterfaces(),
            tempDir: os.tmpDir(),
            updated: new Date().getTime()
        };
        details = JSON.parse(JSON.stringify(details)); //sanitize
        ClusterWorker.update({workerId: _workerId}, {$set: details}, {upsert: true}, function (err) {
            if (err) log.error(err);
        });
        try {
            ClusterWorker.find({updated: {$lt: (new Date().getTime() - (1000 * 40))}}, function (err, objList) {
                objList.forEach(function (obj) {
                    ClusterWorker.remove({_id: obj._id}, function (err) {
                        if (err) log.error(err);
                        else globalEvent.emit("OnClusterWorkerFoundInactive", obj);
                    });
                });
            });
        } catch (c) {
            log.error(c);
        }
    }), 1000 * 30);
};


//Add a emitter transform for functions.
Function.prototype.toEmitter = function () {
    var origFunc = this;
    return function () {
        var args = arguments;
        var emitter = new process.EventEmitter();
        process.nextTick(function () {
            origFunc.apply(emitter, args);
        });
        return emitter;
    }
};