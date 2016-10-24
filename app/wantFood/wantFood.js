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

	self.map = {
		center: {
			latitude: 45, longitude: -73
		},
		zoom: 12
	};
	self.foods = [];


	uiGmapGoogleMapApi.then(function(maps){
		//get the current location from the browser
		if (navigator.geolocation){
			navigator.geolocation.getCurrentPosition(
				(geoInfo) => setMapCenter(geoInfo)
				.then(getFoods)
				.then(setFoodToSelf), console.error
			);
		}
		else {
			//show them a way to create an account (without eula) so they can enter their address
			console.warn('The user refused or doesn\'t support location services');
		}
	})
}