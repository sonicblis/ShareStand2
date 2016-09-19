(function () {
	angular.module('shareStand')
		.component('wantFood', {
			templateUrl: 'app/wantFood/wantFood.html',
			controller: ['uiGmapGoogleMapApi', 'userService', WantFoodController],
			controllerAs: 'wantFoodController'
		});
})();

function WantFoodController(uiGmapGoogleMapApi, userService) {
	var self = this;

	function setMapCenter(geoInfo){
		self.map.center.latitude = geoInfo.coords.latitude;
		self.map.center.longitude = geoInfo.coords.longitude;
	}

	self.map = {
		center: {
			latitude: 45, longitude: -73
		},
		zoom: 12
	};

	uiGmapGoogleMapApi.then(function(maps){
		//get the current location from the browser
		if (navigator.geolocation){
			navigator.geolocation.getCurrentPosition(setMapCenter, console.error);
		}
		else {
			//we'll need to request an address... or something
			//how to get from an address to a long/lat
			$http.get('https://maps.googleapis.com/maps/api/geocode/json?address=3173 Head River Rd, Virginia Beach, VA&key=AIzaSyCl78XL55A3KExJtetl82YJr6Zbnlr9Wmc').then(function (geoInfo) {
				var result = {
					latitude: geoInfo.data.results[0].geometry.location.lat,
					longitude: geoInfo.data.results[0].geometry.location.lng
				};
				// if (peopleService.user.authenticated) {
				// 	peopleService.userRef.child('lat').set(result.latitude);
				// 	peopleService.userRef.child('lng').set(result.longitude);
				// }
				self.map.center.latitude = result.latitude;
				self.map.center.longitude = result.longitude;
			});
		}
	})
}