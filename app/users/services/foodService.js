(function (dataSource) {
	angular.module('shareStand')
		.service('foodService', ['$firebaseArray', '$q', function($firebaseArray, $q){
			var self = this;

			self.getFoodForUser = function(user){
				return $q(function (resolve) {
					var foodRef = dataSource.database()
							.ref('food')
							.orderByChild('owner')
							.equalTo(user.id),
						foodArray = $firebaseArray(foodRef);

					console.info('returning food Array', foodArray);
					resolve(foodArray);
				});
			};
			self.getAllFood = function(){
				return $q(function (resolve, reject) {
					resolve($firebaseArray(dataSource.database().ref('food')));
				});
			};
			self.saveFood = function(food){
				return $q(function (resolve) {
					dataSource.database().ref('food').push(food);
					resolve(food);
				});
			};
			self.saveOffer = function(offer){
				return $q(function (resolve, reject) {
					dataSource.database().ref('offers').push(offer);
					resolve(offer);
				});
			};
			self.getOffers = function(user){
				return $q(function (resolve) {
					if (!user || !user.$id){
						reject(new Error('A User with a valid ID was not provided'));
					}
					resolve($firebaseArray(dataSource.database().ref('offers').orderByChild('owner').equalTo(user.$id)));
				});
			};
			self.getOffersByUser = function(user){
				return $q(function (resolve, reject) {
					if (!user || !user.$id){
						reject(new Error('A User with a valid ID was not provided'));
					}
					dataSource.database().ref('offers')
						.orderByChild('author')
						.equalTo(user.$id)
						.once("value", resolve, reject);
				});
			};
		}]);
})(firebase);