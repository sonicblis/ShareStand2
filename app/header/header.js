(function () {
	angular.module('shareStand')
		.component('header', {
			templateUrl: 'app/header/header.html',
			controller: ['$rootScope', HeaderController],
			controllerAs: 'headerController'
		});

	function HeaderController($rootScope) {
		var self = this;

		self.menuUp = false;

		//init
		$rootScope.$on('element-click', () => self.menuUp = false);
	}
})();
