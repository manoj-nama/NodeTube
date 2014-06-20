var fs = require("fs");

exports.config = function (req, res) {
    res.sendSuccessResponse(__rawConfig);
};

exports.AppConfig = function (req, res) {
    res.sendSuccessResponse(__rawAppConfig);
};

var deleteFolderRecursive = function(path) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
exports.deleteFolder = deleteFolderRecursive;
