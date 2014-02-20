
var timeApp = angular.module("timeApp", ['ngResource', 'ng-rails-csrf']);

timeApp.controller("EntriesCtrl", ['$scope', '$resource', function entriesCtrl($scope, $resource)
{
	var entryResource = $resource("/entries/:id", {id: '@id'}, {update: {method: "PUT"}});
	var view = $scope.view = {};

	view.title = "Lighthouse TT App";
	view.entries = entryResource.query();
	console.log($scope.data);
  view.newEntry = {};

	var answer = 42;	

	$scope.addEntry = function addEntry()
	{
		entryResource.save(view.newEntry);
		view.entries.push(view.newEntry);
		view.newEntry = {};
	};

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