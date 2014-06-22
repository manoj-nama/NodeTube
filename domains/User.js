exports.schema = {
	emailId: String,
	socialId: String,
	name: {},
	password: String,
	dateJoined: Number,
	lastLogin: Number,
	roles: Array,
    playlists: [{
        playlistName: String,
        description: String,
        mediaList: Array
    }]
};

exports.indexes = [
    {emailId: 1},
    {socialId: 1}
];