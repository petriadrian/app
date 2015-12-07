/**
 * Constants
 */
const RO_LOCALE = 'ro';
const EN_LOCALE = 'en';

/**
 * Main AngularJS Web Application
 */
var app = angular.module('appFunctionality', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

/**
 * Initialization
 */
app.run(function ($rootScope, $window) {
    //set a function for opening any url
    $rootScope.openUrl = function (url, openInNewTab) {
        debugger;
        if (typeof(openInNewTab) !== 'undefined' && openInNewTab == "true") {
            $window.open(url, '_blank');
        } else {
            $window.open(url, '_self');
        }
    };
    // set userLanguage
    if (typeof(location.search.split('lang=')[1]) == null) {
        $rootScope.userLanguage = navigator.language || navigator.userLanguage;
    } else {
        $rootScope.userLanguage = location.search.split('lang=')[1];
    }
    if ($rootScope.userLanguage != RO_LOCALE) {
        console.log("English not ready");
        $rootScope.userLanguage = RO_LOCALE; // should be EN_LOCALE ... but en content is not yet added
    }
});

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        // Home
        .when("/", {templateUrl: "partials/home.html", controller: "HomePageCtrl"})
        //// Pages
        //.when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
        //// Blog
        //.when("/blog", {templateUrl: "partials/blog.html", controller: "BlogCtrl"})
        //.when("/blog/post", {templateUrl: "partials/blog_item.html", controller: "BlogCtrl"})
        //// else 404
        .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

/**
 * Controllers
 */
app.controller('HeaderCtrl', function ($scope, $rootScope, $window, $http) {
    debugger;
    var headerContentPath = '/casaPetri/content/' + $rootScope.userLanguage + '/common/header.json';
    $http.get(headerContentPath).success(function (headerContentResult) {
        $scope.headerContent = headerContentResult;
    });
});

app.controller('FooterCtrl', function ($scope, $rootScope, $http, $sce) {
    debugger;
    var reviewsPath = '/casaPetri/content/' + $rootScope.userLanguage + '/common/reviews.json';
    $http.get(reviewsPath).success(function (reviews) {
        $scope.reviews = reviews.sections[0].content.articles;
        $scope.reviewsPagePath = reviews.url;
        $scope.reviewsPageOpenInNewTab = reviews.openInNewTab;
    });
    var footerContentPath = '/casaPetri/content/' + $rootScope.userLanguage + '/common/footer.json';
    $http.get(footerContentPath).success(function (footerContentResult) {
        $scope.footerContent = footerContentResult;
        $scope.googleMapLink = $sce.trustAsResourceUrl(footerContentResult.googleMapLink);
    });
});

app.controller('HomePageCtrl', function ($scope, $rootScope, $location, $routeParams, $http) {
    debugger;
    var pageContentPath = '/casaPetri/content/' + $rootScope.userLanguage + '/home.json';
    $http.get(pageContentPath).success(function (pageContentResult) {
        $scope.pageContent = pageContentResult;
    });
});

app.controller('GetPagePresentationCtrl', function ($scope, $rootScope, $http) {
    debugger;
    var pageToLoadPath = '/casaPetri/content/' + $rootScope.userLanguage + '/' + $scope.slide.page + '.json';
    $http.get(pageToLoadPath).success(function (pageResult) {
        debugger;
        $scope.pagePresentation = pageResult.presentation;
    });
});