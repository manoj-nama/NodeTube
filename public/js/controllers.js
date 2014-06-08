function MasterController ($scope, $location, $rootScope) {
	
}

function HomeController ($scope, $location, $rootScope) {
	$scope.fileUpload={error:false,message:""};
	$rootScope.$on('removeError',function(){
		if($scope.fileUpload.error){
			$scope.fileUpload.error=false;
			$scope.fileUpload.message="";
		}
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
		};
		xhr.upload.onprogress = function (e) {
			$rootScope.uploadProgress = (e.loaded / e.total) * 100;
			$scope.$apply();
		};
		xhr.upload.onerror = function (e) {
			console.log("Error uploading file");
		}

		xhr.open("POST", "/media/upload");
			xhr.send(fd);
		$scope.isUploadingFile = true;
	}
  else{
			$scope.fileUpload.error=true;
			$scope.fileUpload.message="Please upload video files only";
	}
}

}

function VideoConfigController ($scope, $location, $rootScope, $routeParams) {
	$scope.media = $routeParams.id || $rootScope.media;
	$scope.mediaCover = "/media/cover/" + $scope.media;
}


MasterController.$inject = ["$scope", "$location", "$rootScope"];
HomeController.$inject = ["$scope", "$location", "$rootScope"];
VideoConfigController.$inject = ["$scope", "$location", "$rootScope", "$routeParams"];