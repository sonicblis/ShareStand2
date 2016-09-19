(function () {
	'use strict';

	angular.module ('shareStand')
		.config(function(uiGmapGoogleMapApiProvider) {
			uiGmapGoogleMapApiProvider.configure({
				key: 'AIzaSyAzusH0gxLQhOm7JWPwOyNtKwd5jddx3o4',
				v: '3.24',
				libraries: 'weather,geometry,visualization'
			});
		});
} ());