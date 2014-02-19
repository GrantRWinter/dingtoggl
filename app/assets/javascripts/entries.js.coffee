


@timeApp = angular.module "timeApp", []

@timeApp.controller "EntriesCtrl", ["$scope", ($scope) ->
  $scope.title = "Lighthouse Time Tracking App"
  $scope.data = {entries: [
    {project: 'test', date: 'test2', hours: 'asd', user_id: 1, comment: 'asdasdasd'}
  ]}
]