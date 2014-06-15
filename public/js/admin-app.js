var VideoAdminApp = angular.module("VideoAdminApp", ["ngRoute", "VideoApp.directives"]);

VideoAdminApp.config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/media/:filter/:offset/:limit", {templateUrl: "/partials/admin/media.html", controller: MediaController})
		.when("/users/:offset/:limit", {templateUrl: "/partials/admin/users.html", controller: UsersController})
		.when("/settings/:subPage", {templateUrl: "/partials/admin/settings.html", controller: SettingsController})
		.otherwise({redirectTo: "/media/all/0/10"});
}]);