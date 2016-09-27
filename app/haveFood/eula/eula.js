(function () {
	'use strict';

	var app = angular.module('shareStand')
		.component("eula", {
				templateUrl: 'app/haveFood/eula/eula.html',
				controllerAs: 'eulaController',
				controller: ['userService', '$http', '$q', eulaController]
			}
		);

	function eulaController(userService, $http, $q) {
		var self = this;

		function setUserToThis(user) {
			self.user = user;
		}
		function markEulaAccepted(user){
			return $q(function (resolve) {
				user.eulaAccepted = true;
				resolve(user);
			});
		}
		function validateAddress(){
			return $q(function (resolve, reject) {
				$http.post('http://localhost:8088/api/addresstocoords', self.address)
					.then(resolve)
					.catch(reject);
			});
		}
		function updateAddressInfo(coordinates){
			console.log('updating coordinates for user');
			return $q(function (resolve) {
				self.user.coords = coordinates.data;
				self.user.address = self.address;
				resolve(self.user);
			});
		}
		function saveUser(user){
			return $q(function (resolve, reject) {
				user.$save(resolve, reject);
			});
		}
		function logResults(info){
			return $q(function (resolve) {
				console.info('info:', info);
				resolve(info);
			});
		}

		self.criteriaItems = [
			{
				agreed: false,
				terms: 'The food was produced by you or someone in your family'
			},
			{
				agreed: false,
				terms: 'The food was produced or grown withing 10 miles of where it\'s being provided'
			},
			{
				agreed: false,
				terms: 'The food was produced using sustainable methods of production'
			}
		];
		self.allAgreed = false;
		self.address = {};
		self.user = {};
		self.valid = function () {
			return self.allAgreed && self.addressForm.$valid;
		};
		self.toggleCriteriaItem = function (item) {
			item.agreed = !item.agreed;
			self.allAgreed = self.criteriaItems.map(function (item) {
					return item.agreed ? 1 : 0;
				}).join('') === '111';
		};
		self.accept = function () {
			validateAddress()
				.then(logResults)
				.then(updateAddressInfo)
				.then(markEulaAccepted)
				.then(saveUser)
				.catch(console.error);
		};

		//init
		userService.getUser()
			.then(setUserToThis);
	}
}());