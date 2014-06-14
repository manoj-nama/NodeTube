function MasterController ($scope, $location, $rootScope) {
	$scope.toggleMenu = function () {
		angular.element("#drawer").toggleClass("drawer-open");
	};
}

function HomeController ($scope, $location, $rootScope, $http) {
	$scope.fileUpload={error:false,message:""};
	$rootScope.$on('removeError',function(){
		if($scope.fileUpload.error){
			$scope.fileUpload.error=false;
			$scope.fileUpload.message="";
		}
	});

	$http.post("/media/list", {skip: 0, limit: 10}).success(function (resp) {
		$scope.mediaList = resp;
	});

	$scope.uploadFile = function () {
		if(/video\/.*/ig.test($scope.chosenFile.type)){
			var fd = new FormData();
			fd.append("media", $scope.chosenFile);

			var xhr = new XMLHttpRequest();

			xhr.onload = function (e) {
				var resp = JSON.parse(xhr.responseText);
				if(resp.status === 200) {
					$scope.$apply(function () {
						$rootScope.media = resp.fileId;
						$scope.isUploadingFile = false;
						$rootScope.uploadProgress = 0;
						$location.path("/convert/options/" + resp.fileId);
					});
				}
			}
			xhr.upload.onprogress = function (e) {
				var progress = (e.loaded / e.total) * 100;
				$rootScope.uploadProgress = progress;
				$scope.$apply();
			};
			xhr.upload.onerror = function (e) {
				console.log("Error uploading file");
			}

			xhr.open("POST", "/media/upload");
			xhr.send(fd);
			$scope.isUploadingFile = true;
		} else {
			$scope.fileUpload.error=true;
			$scope.fileUpload.message="Please upload video files only";
		}
	};

}

function VideoConfigController ($scope, $location, $rootScope, $routeParams) {
	$scope.media = $routeParams.id || $rootScope.media;
	$scope.mediaCover = "/media/cover/" + $scope.media;
}


MasterController.$inject = ["$scope", "$location", "$rootScope"];
HomeController.$inject = ["$scope", "$location", "$rootScope", "$http"];
VideoConfigController.$inject = ["$scope", "$location", "$rootScope", "$routeParams"];