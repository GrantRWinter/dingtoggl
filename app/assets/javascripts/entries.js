
var timeApp = angular.module("timeApp", []);

timeApp.controller("EntriesCtrl", function($scope) {
	$scope.title = "Lighthouse TT App";
	$scope.data = {
		entries: [
			{ 
				project: "Project 1", 
				date: "12/01/2015",
				hours: 3.5,
				user_id: 1, 
				comment: "fdsafsa"
			}
		]
	}
});