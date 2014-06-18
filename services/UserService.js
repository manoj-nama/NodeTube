exports.list = function (skip, limit, query, projection) {
    var emitter = this;
    User.find(query, projection, {skip: skip, limit: limit}, function (err, docs) {
        if(err) {
            emitter.emit("ERROR", err);
        } else {
            emitter.emit("DONE", docs);
        }
    });
}.toEmitter();