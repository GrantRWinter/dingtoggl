
var timeApp = angular.module("timeApp", ['ngResource', 'ng-rails-csrf']);

timeApp.controller("EntriesCtrl", ['$scope', '$resource', function entriesCtrl($scope, $resource)
{
	var entryResource = $resource("/entries/:id", {id: '@id'}, {update: {method: "PUT"}});
	var view = $scope.view = {};

	view.title = "Lighthouse ClockTower";
	view.entries = entryResource.query();
  view.newEntry = {};	

	$scope.addEntry = function addEntry() {
		entryResource.save(view.newEntry);
		view.entries.push(view.newEntry);
		view.newEntry = {};
	};



	// $scope.totaltoday = function totaltoday () {
	// 	var totalHours = 0;
		
	// 	for(var i=0; i<view.entries.length; i++){
	// 		if (view.entries[i].date == Date()) {
	// 		  totalHours = totalHours + view.entries[i].hours;
	// 	  }else{
	// 		  totalHours = 0;
	// 	}
	// 	return totalHours;
	// };

	$scope.total = function total () {
		var totalHours = 0;
		for(var i=0; i<view.entries.length; i++){
			totalHours = totalHours + view.entries[i].hours;
		}

		
		return totalHours;
	};




	
	// $scope.hoursToday = function(entry) {
	// 	if (entry.date == Date()){

	// 		// var todays_hours = 0
	// 		// for (var i=0; i<entry.length; i++) {
	// 		// 	todays_hours += entry[i].hours
	// 		// }
	// 		return entry.hours;
	// 		console.log(entry.hours);
	// 	}else{
	// 		return 0
	// 	}
	// 	end

	// }

	// $scope.hoursWeek = function(entry) {

	// }


	$scope.dateFilter = function(entry) {
		var today = new Date()
	  var monthAgo = new Date()
	  monthAgo.setMonth(today.getMonth() - 1)

	  var toDate;
	  var fromDate;

	  if ($scope.hasOwnProperty("from_date") == false) {
		  fromDate = monthAgo;
		} else {
			fromDate = new Date($scope.from_date)
		}

	  if ($scope.hasOwnProperty("to_date") == false) {
	  	toDate = today;
	  } else {
	  	toDate = new Date($scope.to_date)
	  }
	  var entryDate = new Date(Date.parse(entry.date))
		return( entryDate > fromDate &&  entryDate < toDate)
	}

	$scope.save = function save(entry)
	{
		console.log(entry);
		entry.$save();
		debugger
	}

	$scope.delete = function(entry, idx)
	{
		var res = entry.$remove(); //Goes to rails
		//Res is a promise!
		res
		.then(function(entry)
		{
			console.log("success", arguments);
		})
		.catch(function(error)
		{

		})
		.finally(function()
		{
			view.entries = entryResource.query();
		});
	}

}]);

timeApp.directive("taConfirmatron", [function(){
	return {
		restrict: "AE",
		priority: 100,
		link: {
			pre: function(scope, element, attrs)
			{
				element.click(function onConfirmatronClick(e)
				{
					if(!confirm(attrs['taConfirmatron']))
					{
						e.stopImmediatePropagation();
						e.preventDefault();
					}
				});
			}
		}
	};
}]);