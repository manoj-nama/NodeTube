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
            $scope.resizeContent();
        }, 200);
    });

    setTimeout(function () {
        $scope.resizeContent();
    }, 500);
};

function MediaController ($scope, $location, $rootScope, $http, $routeParams) {
	$rootScope.currentPage = "media";
    $rootScope.subPage = $routeParams.filter;

    var options = {skip: 0, limit: 10};
    if($routeParams.filter == 'all') {
        options = {skip: 0, limit: 10};
    } else if($routeParams.filter == "conversion") {
        options["query"] = {"conversions.status": "pending"};
    }
    $http.post("/media/list", options).success(function (resp) {
        $scope.mediaList = resp;
    });

    $(window).trigger("resize");
}

function UsersController ($scope, $location, $rootScope, $http, $routeParams) {
	$rootScope.currentPage = "users";
}

function SettingsController ($scope, $location, $rootScope, $http, $routeParams) {
	$rootScope.currentPage = "settings";
    $rootScope.subPage = $routeParams.subPage;
}


MasterController.$inject = ["$scope", "$location", "$rootScope"];
MediaController.$inject = ["$scope", "$location", "$rootScope", "$http", "$routeParams"];
UsersController.$inject = ["$scope", "$location", "$rootScope", "$http", "$routeParams"];
SettingsController.$inject = ["$scope", "$location", "$rootScope", "$http", "$routeParams"];