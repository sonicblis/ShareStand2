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
			}
			self.saveFood = function(food){
				return $q(function (resolve) {
					dataSource.database().ref('food').push(food);
					resolve(food);
				});
			}
		}]);
})(firebase);