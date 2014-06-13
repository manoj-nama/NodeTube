exports.schema = {
	userId: {type: String, default: "public"},
	mediaId: String,
	timestampAdded: Number
};

exports.indexes = [
    {userId: 1},
    {mediaId: 1}
];