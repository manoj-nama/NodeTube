exports.schema = {
	userId: {type: String, default: "public"},
	mediaId: String,
	timestampAdded: Number,
	metadata: {
		title: String,
		status: {type: String, default: "public"}
	}
};

exports.indexes = [
    {userId: 1},
    {mediaId: 1}
];