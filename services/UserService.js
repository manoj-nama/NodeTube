exports.list = function (skip, limit, query, projection) {
    var emitter = this;
    projection["password"] = 0;
    User.find(query, projection, {skip: skip, limit: limit}, function (err, docs) {
        if(err) {
            emitter.emit(events.ERROR, err);
        } else {
            emitter.emit(events.DONE, docs);
        }
    });
}.toEmitter();

exports.get = function (userId) {
    var emitter = this;
    User.findOne({_id: userId}, {password: 0}, function (err, user) {
        if(user) {
            emitter.emit(events.ERROR, err);
        } else {
            emitter.emit(events.DONE, user);
        }
    });
}.toEmitter();

exports.delete = function (userId) {
    var emitter = this;
    User.remove({_id: userId}, function (err, resp) {
        if(err) {
            emitter.emit(events.ERROR, err);
        } else {
            emitter.emit(events.DONE, resp);
        }
    });
}.toEmitter();

exports.update = function (userId, dirtyProps) {
    var emitter = this;
    User.update({_id: userId}, {$set: dirtyProps}, function (err, resp) {
        if(err) {
            emitter.emit(events.ERROR, err);
        } else {
            emitter.emit(events.DONE, resp);
        }
    });
}.toEmitter();