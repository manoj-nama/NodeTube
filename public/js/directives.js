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
  }]);