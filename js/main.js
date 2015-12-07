/**
 * Constants
 */
const RO_LOCALE = 'ro';
const EN_LOCALE = 'en';

/**
 * Main AngularJS Web Application
 */
var app = angular.module('appFunctionality', ['ngRoute']);

/**
 * Initialization
 */
app.run(function ($rootScope, $window, $routeParams, $location, $route) {
    //set a function for opening any url
    $rootScope.openUrl = function (url, openInNewTab) {
        if (typeof(openInNewTab) !== 'undefined' && openInNewTab == "true") {
            $window.open(url, '_blank');
        } else {
            $window.open(url, '_self');
        }
    };
    // set userLanguage
    debugger;
    if (typeof($route.current.params.key) !== 'undefined') {
        $rootScope.userLanguage = navigator.language || navigator.userLanguage;
    } else {
        $rootScope.userLanguage = $routeParams.lang;
    }
    if ($rootScope.userLanguage != RO_LOCALE) {
        console.log("English not ready");
        $rootScope.userLanguage = EN_LOCALE; // should be EN_LOCALE ... but en content is not yet added
    }
    $rootScope.changeLanguage = function (languageKey) {
        $rootScope.userLanguage = languageKey;
        $route.reload();
    }
});

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        // Home
        .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
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
        $scope.header = headerContentResult;
    });
});

app.controller('FooterCtrl', function ($window, $scope, $rootScope, $http, $sce) {
    debugger;
    var reviewsPath = '/casaPetri/content/' + $rootScope.userLanguage + '/reviews.json';
    $http.get(reviewsPath).success(function (reviews) {
        $scope.reviews = reviews.sections[0].content.articles;
        $scope.reviewsPagePath = reviews.url;
        $scope.reviewsPageOpenInNewTab = reviews.openInNewTab;
    });
    var footerContentPath = '/casaPetri/content/' + $rootScope.userLanguage + '/common/footer.json';
    $http.get(footerContentPath).success(function (footerContentResult) {
        $scope.footer = footerContentResult;
        $scope.googleMapLink = $sce.trustAsResourceUrl(footerContentResult.googleMapLink);
    });
});

app.controller('PageCtrl', function ($scope, $rootScope, $location, $routeParams, $http) {
    debugger;
    console.log("Page Controller reporting for duty.");
    $scope.pageContent2 = 'petri';
    var pageContentPath = '/casaPetri/content/' + $rootScope.userLanguage + $location.$$path + 'pageContent.json';
    $http.get(pageContentPath).success(function (pageContentResult) {
        $scope.pageContent = pageContentResult[0];
    });
});
