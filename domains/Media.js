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
    downvotes: Array,
    reportedBy: Array,
    comments: [{
        userId: String,
        timestampAdded: Number,
        status: String,
        message: String,
        reportedBy: Array
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
    {tags: 1}
];