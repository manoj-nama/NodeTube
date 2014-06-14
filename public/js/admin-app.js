var VideoAdminApp = angular.module("VideoAdminApp", ["ngRoute", "VideoApp.directives"]);

VideoAdminApp.config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/", {template: "<div></div>", controller: AdminHomeController})
		.otherwise({redirectTo: "/"});
}]);