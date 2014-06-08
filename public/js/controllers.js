function MasterController ($scope, $location, $rootScope) {
	
}

function HomeController ($scope, $location, $rootScope) {
	$scope.uploadFile = function () {
		var fd = new FormData();
		fd.append("media", $scope.chosenFile);

		var xhr = new XMLHttpRequest();

		xhr.upload.onload = function (e) {
			console.log("File uploaded", e);
		};
		xhr.upload.onprogress = function (e) {
			console.log((e.loaded / e.total) * 100, "%");
		};
		xhr.upload.onerror = function (e) {
			console.log("Error uploading file");
		}

		xhr.open("POST", "/media/upload");
		xhr.send(fd);
	}
}

function VideoConfigController ($scope, $location, $rootScope) {
		
}

MasterController.$inject = ["$scope", "$location", "$rootScope"];
HomeController.$inject = ["$scope", "$location", "$rootScope"];
VideoConfigController.$inject = ["$scope", "$location", "$rootScope"];