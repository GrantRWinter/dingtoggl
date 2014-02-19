
var timeApp = angular.module("timeApp", ['ngResource']);


timeApp.controller("EntriesCtrl", function($scope, $resource) {
	var Entry = $resource("/entries/:id", {id: '@id'});
	$scope.title = "Lighthouse TT App";
	$scope.entries = Entry.query();
	console.log($scope.data);
	$scope.newEntry = {};
	
	$scope.saveEntry = function() {
		// use the Entry to POST an entry to the Rails app
		console.log('you tried to save an entry with comment: ' + $scope.newEntry.comment);
	}

});