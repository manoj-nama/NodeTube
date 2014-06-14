function MasterController ($scope, $location, $rootScope) {
	console.log("MasterController");
};

function MediaController ($scope, $location, $rootScope, $http, $routeParams) {
	console.log("MediaController");	
	$rootScope.currentPage = "media";
};

function UsersController ($scope, $location, $rootScope, $http, $routeParams) {
	console.log("MediaController");	
	$rootScope.currentPage = "users";
};

function SettingsController ($scope, $location, $rootScope, $http, $routeParams) {
	console.log("MediaController");	
	$rootScope.currentPage = "settings";
};


MasterController.$inject = ["$scope", "$location", "$rootScope"];
MediaController.$inject = ["$scope", "$location", "$rootScope", "$http", "$routeParams"];
UsersController.$inject = ["$scope", "$location", "$rootScope", "$http", "$routeParams"];
SettingsController.$inject = ["$scope", "$location", "$rootScope", "$http", "$routeParams"];