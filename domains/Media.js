exports.schema = {
	userId: {type: String, default: "public"},
	mediaId: String,
	timestampAdded: Number,
	description: {
		title: String,
		status: {type: String, default: "public"}
	},
	conversions: [{
		format: String,
		mediaId: String,
		status: {type: String, default: "pending"}
	}]
};

exports.indexes = [
    {userId: 1},
    {mediaId: 1}
];