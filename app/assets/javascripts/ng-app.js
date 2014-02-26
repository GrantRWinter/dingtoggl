function customParseDate(dateString) {
	var arr = dateString.split("-");
	var date = new Date(parseInt(arr[0],10),
											parseInt(arr[1]-1,10),
											parseInt(arr[2],10)
											);
	return date; 
}

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
		var todayFullDate = new Date();
		//todayFullDate = String(todayFullDate).substr(0,15);

		var totalHours = 0;
		for(var i=0; i<view.entries.length; i++){ 
			var entriesDayParsed = customParseDate( view.entries[i].date );
			if ( 
					todayFullDate.getYear() == entriesDayParsed.getYear() &&
					todayFullDate.getMonth() == entriesDayParsed.getMonth() &&
					todayFullDate.getDay() == entriesDayParsed.getDay()
				) {
				totalHours = totalHours + view.entries[i].hours;
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

	$scope.total_week = function total_week () {
		var todayFullDate = new Date();

		var totalHours = 0;
		for(var i=0; i<view.entries.length; i++){ 
			var entriesDayParsed = customParseDate( view.entries[i].date );
			console.log("hello" + entriesDayParsed);
			console.log(moment().format("MMM Do YY"))
			console.log(moment() + "yuppers");
			console.log(moment(entriesDayParsed).format("MMM Do YY") + " other-day");
			console.log(moment().format("MMM Do YY"))
			console.log(moment().calendar());

			if ( 
					//moment().format("MMM Do YY") == moment(entriesDayParsed).format("MMM Do YY")
					// todayFullDate.getYear() == entriesDayParsed.getYear() &&
					// todayFullDate.getMonth() == entriesDayParsed.getMonth() &&
					// todayFullDate.getDay() == entriesDayParsed.getDay()
					moment(entriesDayParsed).calendar() >= moment().subtract('days', 7).calendar()
				) {
				totalHours = totalHours + view.entries[i].hours;
			}
		}
		return totalHours;
	};


	// Date filter for filtering date
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
		return( entryDate >= fromDate &&  entryDate <= toDate)
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