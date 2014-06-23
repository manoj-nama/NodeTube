exports.onEvent = function (mediaId, conversionType, format) {
    Media.update({
        mediaId: mediaId,
        "conversions.conversionType": conversionType,
        "conversions.format": format
    }, {
        $set: {
            "conversions.$.status": "complete",
            "conversions.$.timestampConverted": +new Date()
        }
    }, function (err, count) {
        if(err) {
            console.log("Error updating conversion status for media", mediaId, "and format", format);
        } else {
            console.log("Conversion status updated for media", mediaId, "and format", format);
        }
    });
};