(function () {
	angular.module('shareStand')
		.component('userInfo', {
			templateUrl: 'app/users/components/userInfo/userInfo.html',
			controller: ['userService', UserInfoController],
			controllerAs: 'userInfoController'
		});

	function UserInfoController(userService) {
		var self = this;

		function setUserToThis(user){
			self.user = user;
		}

		this.user = {};
		this.doLogin = userService.doLogin;

		//init
		userService.getUser()
			.then(setUserToThis)
	}
})();

