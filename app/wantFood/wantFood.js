(function () {
	angular.module('shareStand')
		.component('wantFood', {
			templateUrl: 'app/wantFood/wantFood.html',
			controller: ['uiGmapGoogleMapApi', 'userService', 'foodService', '$q', WantFoodController],
			controllerAs: 'wantFoodController'
		});
})();

function WantFoodController(uiGmapGoogleMapApi, userService, foodService, $q) {
	var self = this;

	function setMapCenter(geoInfo){
		return $q(function (resolve, reject) {
			self.map.center.latitude = geoInfo.coords.latitude;
			self.map.center.longitude = geoInfo.coords.longitude;
			resolve(geoInfo);
		});
	}
	function getFoods(){
		return $q(function (resolve, reject) {
			foodService.getAllFood()
				.then(resolve);
		});
	}
	function setFoodToSelf(foodWatcher){
		return $q(function (resolve, reject) {
			self.foods = foodWatcher;
			resolve(foodWatcher);
		});
	}
	function setUsersFoodToSelf(foods){
		return $q(function (resolve) {
			self.usersFood = foods;
			resolve(foods);
		});
	}
	function clearOffer(){
		self.offer = {};
	}

	self.map = {
		center: {
			latitude: 45, longitude: -73
		},
		zoom: 12
	};
	self.foods = [];
	self.usersFood = [];
	self.offer = {};
	self.selectedFood = null;
	self.selectFood = function(food){
		if (self.selectedFood != food){
			//clear out any current offer in the making
			clearOffer();
		}
		self.selectedFood = food;
		self.offer.wantedFood = food.$id;
	};

	//inti
	uiGmapGoogleMapApi.then(function(maps){
		//get the current location from the browser
		if (navigator.geolocation){
			navigator.geolocation.getCurrentPosition(
				(geoInfo) => setMapCenter(geoInfo)
				.then(getFoods)
				.then(setFoodToSelf), console.error
			);
			userService.getUser()
				.then(foodService.getFoodForUser)
				.then(setUsersFoodToSelf)
				.catch(console.error);
		}
		else {
			//show them a way to create an account (without eula) so they can enter their address
			console.warn('The user refused or doesn\'t support location services');
		}
	})
}