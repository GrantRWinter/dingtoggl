
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



	$scope.total_today = function total_today () {
		var totalHours = 0;
		for(var i=0; i<view.entries.length; i++){
			if (view.entries.date == Date()) {
				debugger
			  totalHours = totalHours + view.entries[i].hours;
		  }else{
			totalHours = 0;
		}
		}
		
		return totalHours;
	};

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
	  if ($scope.hasOwnProperty("from_date") == false) $scope.from_date = "0000-01-01";
	  if ($scope.hasOwnProperty("to_date") == false) $scope.to_date = Date();
		return( entry.date > $scope.from_date && entry.date < $scope.to_date)

	}

	$scope.save = function save(entry)
	{
		console.log(entry);
		entry.$save();
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