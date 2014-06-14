exports.init = function () {

	console.log("\nBootstrapping Users ...");
	User.count({roles: {$in: ['Admin']}}, function (err, count) {
		if(err) {
			console.log("Error bootstrapping Users");
		} else {
			if(!count) {
				new User({
					emailId: "admin@nc.com",
					name: {alias: "admin", first: "admin"},
					dateJoined: +new Date(),
					password: "123456",
					roles: ["Admin"]
				}).save(function (err, resp) {
					console.log("Users Bootstrapped");
				});
			} else {
				console.log("Users already Bootstrapped")
			}
		}
	});
};