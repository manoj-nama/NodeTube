function MasterController ($scope, $location, $rootScope) {
	console.log("MasterController");
};

function AdminHomeController ($scope) {
	console.log("AdminHomeController");	
};


MasterController.$inject = ["$scope", "$location", "$rootScope"];
AdminHomeController.$inject = ["$scope"];