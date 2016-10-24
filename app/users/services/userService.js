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
					firebase.database().ref('users/' + userInfo.id).update(userInfo, function(){
						userService.setUser(userInfo);
					});
				}
				else{
					userService.setUser(null);
				}
			});
		}])
		.service('userService', ['$q', '$firebaseObject', userService]);

	function userService($q, firebaseObject){
		var self = this,
			userProvided = $q.defer(),
			subscribers = [],
			lastUser = null;

		function callSubscriber(func){
			console.log('providing user to ' + (func.subscriberName || 'subscriber'));
			func(user);
		}

		self.onNewUserProvided = function(func, subscriberName){
			func.subscriberName = subscriberName;
			subscribers.push(func);
		};
		self.getUser = function(){
			return userProvided.promise;
		};
		self.setUser = function(user){
			try {
				lastUser = user ? firebaseObject(firebase.database().ref('users').child(user.id)) : user;
			}
			catch(err){
				console.error(err);
			}
			user ? lastUser.$loaded(() => userProvided.resolve(lastUser)) : userProvided.reject();
			subscribers.forEach(callSubscriber);
		};
		self.setUserProperty = function(name, value){
			var userId = lastUser.id;
			firebase.database()
				.ref('users')
				.child(userId)
				.child(name)
				.set(value);
		};
		self.doLogin = function(){
			var provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithPopup(provider);
		};
	}
})(firebase);

