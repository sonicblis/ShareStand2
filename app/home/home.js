(function () {
	angular.module('shareStand')
		.component('home', {
			templateUrl: 'app/home/home.html',
			controller: ['userService', HomeController],
			controllerAs: 'homeController'
		});

	function HomeController(userService) {
		var self = this;

		function setUserToThis(user){
			self.user = user;
		}

		this.user = {};

		//init
		userService.getUser()
			.then(setUserToThis)
	}
})();
