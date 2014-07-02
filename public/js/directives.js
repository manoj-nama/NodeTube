angular.module('VideoApp.directives', []).
	directive('fileModel', ['$parse', '$rootScope', function ($parse, $rootScope) {
	    return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				var model = $parse(attrs.fileModel);
				var modelSetter = model.assign;
				element.bind('change', function (e) {
					e.preventDefault();
					$rootScope.$emit('removeError');
					var file = element[0].files[0];
					scope.$apply(function () {
						modelSetter(scope, file);
					});
				});
			}
	    };
	}])
	.directive("videoTimer", ["$parse", function ($parse) {
		return {
			restrict: "A",
			link: function (scope, element, attrs) {
				element.on("timeupdate", function (e) {
                    var duration = this.duration;
                    var currentTime = this.currentTime;
                    var isPaused = this.paused;
					scope.$apply(function () {
                         var parseFn = scope.$eval(attrs.updateFn);
                        parseFn(currentTime, duration, isPaused);
                    });
				});
			}
		};
	}])
