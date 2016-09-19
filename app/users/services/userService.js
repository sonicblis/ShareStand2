(function (firebase) {
	angular.module('shareStand')
		.run(['userService', function(userService){
			firebase.auth().onAuthStateChanged(function(user) {
				if (user) {
					//update the db
					var userInfo = {
						displayName : user.providerData[0].displayName,
						photoURL : user.providerData[0].photoURL,
						id : user.uid
					};

					//set userService user
					userService.setUser(userInfo);

					firebase.database().ref('users/' + id).set(userInfo);
				}
				else{
					firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
				}
			});
		}])
		.service('userService', ['$q', userService]);

	function userService($q){
		var userProvided = $q.defer(),
			subscribers = [],
			lastUser = null;

		function callSubscriber(func){
			console.log('providing user to ' + (func.subscriberName || 'subscriber'));
			func(user);
		}

		this.onNewUserProvided = function(func, subscriberName){
			func.subscriberName = subscriberName;
			subscribers.push(func);
		};
		this.getUser = function(){
			return userProvided.promise;
		};
		this.setUser = function(user){
			lastUser = user;
			userProvided.resolve(user);
			subscribers.forEach(callSubscriber);
		};
	}
})(firebase);

