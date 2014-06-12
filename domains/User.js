exports.schema = {
	emailId: String,
	socialId: String,
	name: {},
	password: String,
	dateJoined: Number,
	lastLogin: Number
}

exports.indexes = [
    {emailId: 1},
    {socialId: 1}
];