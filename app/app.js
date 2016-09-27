(function () {
	angular.module('shareStand', ['ui.router', 'uiGmapgoogle-maps', 'firebase'])
		.run(['$rootScope', function($rootScope){
			//connect to firebase
			firebase.initializeApp({
				apiKey: "AIzaSyAdVNAjhll7Y9iD9KqEAsAVC-j29s0Jj6o",
				authDomain: "sharestand.firebaseapp.com",
				databaseURL: "https://sharestand.firebaseio.com",
				storageBucket: "firebase-sharestand.appspot.com",
				messagingSenderId: "359405160453"
			});
		}])
		.component('app', {
			templateUrl: 'app/app.html',
			controller: ['userService', AppController],
			controllerAs: 'appController'
		});

	function AppController(userService) {
		var self = this;

		function setUserToThis(user){
			self.user = user;
		}

		self.user = {};

		//init
		userService.getUser()
			.then(setUserToThis)
			.catch(console.error);

		userService.onNewUserProvided(setUserToThis, 'AppController');
	}
})();
