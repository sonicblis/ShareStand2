(function () {
	angular.module('shareStand')
		.component('foodList', {
			templateUrl: 'app/haveFood/foodList/foodList.html',
			controller: ['userService', 'foodService', FoodListController],
			controllerAs: 'foodListController'
		});

	function FoodListController(userService, foodService) {
		var self = this;

		function setFoodListToSelf(foodList){
			self.foodList = foodList;
		}

		self.foodList = []; //firebase array of food items
		self.adding = false;
		self.hideAdder = function(){
			self.adding = false;
		};

		//init
		userService.getUser()
			.then(foodService.getFoodForUser)
			.then(setFoodListToSelf)
			.catch(console.error);
	}
})();