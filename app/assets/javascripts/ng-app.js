
var timeApp = angular.module("timeApp", ['ngResource']);


timeApp.controller("EntriesCtrl", function($scope, $resource) {
	var Entry = $resource("/entries/:id", {id: '@id'});
	$scope.title = "Lighthouse TT App";
	$scope.entries = Entry.query();
	console.log($scope.data);
	// $scope.data = {
	// 	entries: [
	// 		{ 
	// 			project: "Project 1", 
	// 			date: "12/01/2015",
	// 			hours: 3.5,
	// 			user_id: 1, 
	// 			comment: "fdsafsa"
	// 		}
	// 	]
	// }
	// Entry.query(function(data) {
	// 	console.log(data);
	// });
});