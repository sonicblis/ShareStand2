(function () {
	angular.module('shareStand')
		.component('haveFood', {
			templateUrl: 'app/haveFood/haveFood.html',
			controller: ['$q', '$http', 'userService', HaveFoodController],
			controllerAs: 'haveFoodController'
		});

	function HaveFoodController($q, $http, userService) {
		var self = this;

		function setUserToSelf(user){
			console.log('setting user in have food controller');
			return $q(function (resolve) {
				self.user = user;
				resolve(user);
			});
		}

		self.user = {};
		self.accountRequired = false;


		//init
		userService.getUser()
			.then(setUserToSelf);
	}
})();