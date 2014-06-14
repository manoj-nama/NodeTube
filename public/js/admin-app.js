var VideoAdminApp = angular.module("VideoAdminApp", ["ngRoute", "VideoApp.directives"]);

VideoAdminApp.config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/media/:offset/:limit", {templateUrl: "/partials/admin/media.html", controller: MediaController})
		.when("/users/:offset/:limit", {templateUrl: "/partials/admin/users.html", controller: UsersController})
		.when("/settings", {templateUrl: "/partials/admin/settings.html", controller: SettingsController})
		.otherwise({redirectTo: "/media/0/10"});
}]);