var VideoApp = angular.module("VideoApp", ["ngRoute"]);

VideoApp.config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/", {templateUrl: "/partials/upload.html", controller: HomeController})
		.when("/convert/options", {templateUrl: "/partials/options.html", controller: VideoConfigController})
		.otherwise({redirectTo: "/"});
}]);