exports.schema = {
	emailId: String,
	socialId: String,
	name: {},
	password: String,
	dateJoined: Number,
	lastLogin: Number,
	roles: Array
}

exports.indexes = [
    {emailId: 1},
    {socialId: 1}
];