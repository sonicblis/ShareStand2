(function () {
	angular.module('shareStand')
		.component('login', {
			templateUrl: 'app/users/components/login/login.html',
			controller: ['userService', LoginController],
			controllerAs: 'loginController'
		});

	function LoginController(userService) {
		var self = this;

		self.doLogin = userService.doLogin;

		//init
	}
})();