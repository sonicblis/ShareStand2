(function () {
	angular.module('shareStand')
		.component('wantFood', {
			templateUrl: 'app/wantFood/wantFood.html',
			controller: ['uiGmapGoogleMapApi', 'userService', 'foodService', '$q', '$timeout', WantFoodController],
			controllerAs: 'wantFoodController'
		});
})();

function WantFoodController(uiGmapGoogleMapApi, userService, foodService, $q, $timeout) {
	var self = this,
		ensureOffers = new $q.defer();

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
	function foodItemAdded(event){

	}
	function setupNewFoodWatch(food){
		return $q(function (resolve) {
			food.$watch(foodItemAdded);
			resolve(food);
		});
	}
	function setFoodToSelf(foodWatcher){
		return $q(function (resolve) {
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
	function setOffersToSelf(offers){
		return $q(function (resolve) {
			self.offers = offers.val();
			ensureOffers.resolve(offers.val());
			resolve(offers.val());
		});
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
	self.offers = [];
	self.selectedFood = null;
	self.selectFood = function(food){
		if (self.selectedFood != food){
			//clear out any current offer in the making
			clearOffer();
		}
		self.selectedFood = food;
		self.offer.wantedFood = food.$id;
		self.offer.owner = food.owner;
	};
	self.sendOffer = function(offer){
		userService.getUser()
			.then((user) => {
				offer.author = user.$id;
				foodService.saveOffer(offer)
					.then(() => {
						toastr.success('Your offer has been sent');
						$timeout(() => self.selectedFood = null);
					});
			});
	};

	//inti
	uiGmapGoogleMapApi.then(function(maps){
		//get the current location from the browser
		if (navigator.geolocation){
			navigator.geolocation.getCurrentPosition(
				(geoInfo) => setMapCenter(geoInfo)
					.then(getFoods)
					.then(setupNewFoodWatch)
					.then(setFoodToSelf), console.error
			);
			userService.getUser()
				.then(foodService.getFoodForUser)
				.then(setUsersFoodToSelf)
				.catch(console.error);
			userService.getUser()
				.then(foodService.getOffersByUser)
				.then(setOffersToSelf)
				.catch(console.error);
		}
		else {
			//show them a way to create an account (without eula) so they can enter their address
			console.warn('The user refused or doesn\'t support location services');
		}
	})
}