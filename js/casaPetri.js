$('.carousel').carousel({
	interval : 16000
});

$('.nav a').on('click', function(){
   $(".navbar-toggle").click()
});

var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
    $scope.menuBox = [{
        "title": "MERGE",
        "hoverTitle": "Rezerva o camera",
        "homePageRef": "pages/accommodation/page.html",
        "otherPageRef": "../../accommodation/page.html",
        "homePageFirstImageRef": "images/accomodation/rooms/1.png",
        "homePageSecondImageRef": "../../images/accomodation/rooms/1.png",
        "homePageFirstImageRef": "images/accomodation/rooms/2.png",
        "homePageSecondImageRef": "../../images/accomodation/rooms/2.png",
        "homePageFirstImageRef": "images/accomodation/rooms/3.png",
        "homePageSecondImageRef": "../../images/accomodation/rooms/3.png",
        "boxTitle": "Casu?a a fost cinematograf, spital ?i banc? iar acum este redeschis? ca spa?iu de cazare. Vizita?i-o!",
    }];
});

// Unuused functions
// Add active when a button clicked
//    $(document).ready(function () {
//   $('ul.nav > li').click(function (e) {
//       $('ul.nav > li').removeClass('active');
//       $(this).addClass('active');
//   });
//});