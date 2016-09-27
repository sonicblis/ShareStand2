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
			//show them a way to create an account (without eula) so they can enter their address
			console.warn('The user refused or doesn\'t support location services');
		}
	})
}