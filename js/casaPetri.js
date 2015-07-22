$('.carousel').carousel({
	interval : 16000
});

$('.nav a').on('click', function(){
   $(".navbar-toggle").click()
});

function ContentCtrl($scope, $http) {
    "use strict";

    $scope.url = '../pages/commonStuffs/content/reservation.json';
    $scope.content = [];

    $scope.fetchContent = function() {
        $http.get($scope.url).then(function(result){
            $scope.content = result.data;
        });
    }

    $scope.fetchContent();
}

// Unuused functions
// Add active when a button clicked
//    $(document).ready(function () {
//   $('ul.nav > li').click(function (e) {
//       $('ul.nav > li').removeClass('active');
//       $(this).addClass('active');
//   });
//});