function MasterController ($scope, $location, $rootScope) {
	
}

function HomeController ($scope, $location, $rootScope) {
	angular.element("#videoFile").on("change", function(e) {
		if(e.target && e.target.files && e.target.files.length) {
			$scope.chosenFile = e.target.files[0];
			$scope.$apply();
		} else {
			console.log("Error choosing file ...");
		}
	});
}

function VideoConfigController ($scope, $location, $rootScope) {
		
}

MasterController.$inject = ["$scope", "$location", "$rootScope"];
HomeController.$inject = ["$scope", "$location", "$rootScope"];
VideoConfigController.$inject = ["$scope", "$location", "$rootScope"];