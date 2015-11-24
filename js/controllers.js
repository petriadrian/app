var bookingApp = angular.module('bookingApp', []);

bookingApp.controller('LoadPageDataCtrl', function ($scope, $http) {
    $http.get('/casapetri/content/ro/activities/trails/letySulei/pageStructure.json').success(function(data){
        $scope.pageContent = data[0];
    });
});