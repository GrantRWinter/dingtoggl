@timeApp = angular.module "timeApp", []

@timeApp.controller "EntriesCtrl", ["$scope", ($scope) ->
  $scope.title = "Lighthouse Time Tracking App"
  $scope.data = 
  entries: [{project: 'Cohort 2', comment: 'Helped TA AngularJS', date: "2014-12-18T15:34:33-08:33", hours: 13.25, user_id: 1},
            {project: 'Cohort 2', comment: 'Helped TA Rails 4.0', date: "2014-12-18T18:45:33-08:33", hours: 8.75, user_id: 1},
            {project: 'Cohort 2', comment: 'Helped TA Ruby', date: "2014-12-12T18:30:30-08:33", hours: 4, user_id: 1}] 
]