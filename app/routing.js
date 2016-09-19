(function(){
	angular.module('shareStand')
		.run(['$rootScope', function($rootScope){
			$rootScope.$on('$stateChangeError',
				function(event, toState, toParams, fromState, fromParams, error){
					console.error(error);
				}
			);
		}])
		.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
			function SimpleRoute(name){
				this.name = name;
				this.url = '/' + name;
				this.component = name;
			}

			$urlRouterProvider.otherwise('wantFood');

			$stateProvider.state(new SimpleRoute('home'));
			$stateProvider.state(new SimpleRoute('haveFood'));
			$stateProvider.state(new SimpleRoute('wantFood'));
			$stateProvider.state(new SimpleRoute('createAccount'));
		}]);
})();
