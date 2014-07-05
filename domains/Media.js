exports.schema = {
	userId: {type: String, default: "public"},
	mediaId: String,
	timestampAdded: Number,
	description: {
		title: String,
		status: {type: String, default: "public"}
	},
    tags: Array,
    upvotes: Array,
    upvotesCount: Number,
    downvotes: Array,
    downvotesCount: Number,
    reportedBy: Array,
    comments: [{
        userId: String,
        timestampAdded: Number,
        status: String,
        timemark: {type: Number, default: -1},
        message: String,
        reportedBy: Array
    }],
    snapshots: [{
        timestampAdded: Number,
        timeMark: Number,
        snapshotFilename: String,
        creationRequestCount: Number //How many times this snapshot is requested to be created
    }],
    conversions: [{
		format: String,
        conversionType: {type: String, default: "auto"},
        timestampAdded: Number,
        timestampConverted: Number,
		status: {type: String, default: "pending"}
	}]
};

exports.indexes = [
    {userId: 1},
    {mediaId: 1},
    {tags: 1},
    {upvotesCount: 1}
];