(function () {
	angular.module('shareStand')
		.component('foodAdder', {
			bindings: {
				onHide: '&'
			},
			templateUrl: 'app/haveFood/foodAdder/foodAdder.html',
			controller: ['userService', 'foodService', '$q', FoodAdderController],
			controllerAs: 'foodAdderController'
		});

	function FoodAdderController(userService, foodService, $q) {
		var self = this;

		function associateUserToFood(user){
			return $q(function (resolve) {
				self.food.owner = user.id;
				self.food.coord = user.coords;
				resolve(self.food);
			});
		}

		self.food = {};
		self.addFood = function(){
			userService.getUser()
				.then(associateUserToFood)
				.then(foodService.saveFood)
				.then(self.cancelAdding)
				.catch(console.error);
		};
		self.cancelAdding = function(){
			return $q(function (resolve) {
				self.onHide();
				self.food = {};
				resolve();
			});
		};
	}
})();
