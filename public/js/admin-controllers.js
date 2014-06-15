function MasterController ($scope, $location, $rootScope) {
	console.log("MasterController");

    $scope.resizeContent = function () {
        var $contentEl = angular.element("#content");
        var paddingCorrection = 50;
        var windowWidth = $("body").width();
        var sidebarWidth = $("#sidebar").width();
        $contentEl.css("width", (windowWidth - sidebarWidth - paddingCorrection));
    };

    var tOut = 0;
    $(window).on("resize", function () {
        clearTimeout(tOut);
        setTimeout(function () {
            console.log("resizing ...");
            $scope.resizeContent();
        }, 200);
    });

    setTimeout(function () {
        $scope.resizeContent();
    }, 500);
};

function MediaController ($scope, $location, $rootScope, $http, $routeParams) {
	console.log("MediaController");	
	$rootScope.currentPage = "media";
    $rootScope.subPage = $routeParams.filter;
};

function UsersController ($scope, $location, $rootScope, $http, $routeParams) {
	console.log("UsersController");
	$rootScope.currentPage = "users";
};

function SettingsController ($scope, $location, $rootScope, $http, $routeParams) {
	console.log("SettingsController");
	$rootScope.currentPage = "settings";
    $rootScope.subPage = $routeParams.subPage;
};


MasterController.$inject = ["$scope", "$location", "$rootScope"];
MediaController.$inject = ["$scope", "$location", "$rootScope", "$http", "$routeParams"];
UsersController.$inject = ["$scope", "$location", "$rootScope", "$http", "$routeParams"];
SettingsController.$inject = ["$scope", "$location", "$rootScope", "$http", "$routeParams"];