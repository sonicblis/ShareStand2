(function () {
	angular.module('shareStand')
		.directive('broadcastElementClick', ['$rootScope', function($rootScope){
			return function(scope, element){
				element.bind('click', function(){
					$rootScope.$broadcast('element-click', {element: element});
				})
			}
		}]);
})();

function Controller() {

}