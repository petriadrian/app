/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */
const RO_LOCALE = 'ro';
const EN_LOCALE = 'en';

/**
 * Main AngularJS Web Application
 */
var app = angular.module('tutorialWebApp', [
    'ngRoute'
]);

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

app.controller('HeaderCtrl', function ($scope, $window, $http) {
    $scope.openUrl = function (url, openInNewTab) {
        if (typeof(openInNewTab) !== 'undefined' && openInNewTab == "true") {
            $window.open(url, '_blank');
        } else {
            $window.open(url, '_self');
        }
    }
    $scope.userLanguage = RO_LOCALE;//navigator.language || navigator.userLanguage;
    var headerContentPath = '/casaPetri/content/' + $scope.userLanguage + '/common/header.json';
    $http.get(headerContentPath).success(function (headerContentResult) {
        $scope.header = headerContentResult[0];
    });
});

app.controller('FooterCtrl', function ($window, $scope, $http) {
    $scope.openUrl = function (url, openInNewTab) {
        if (typeof(openInNewTab) !== 'undefined' && openInNewTab == "true") {
            $window.open(url, '_blank');
        } else {
            $window.open(url, '_self');
        }
    }
    $scope.userLanguage = RO_LOCALE;
    var reviewsPath = '/casaPetri/content/' + $scope.userLanguage + '/reviews.json';
    $http.get(reviewsPath).success(function (reviews) {
        $scope.reviews =  reviews[0].sections[0].content.articles;
        $scope.reviewsPagePath =  reviews[0].url;
        $scope.reviewsPageOpenInNewTab =  reviews[0].openInNewTab;
    });
    var footerContentPath = '/casaPetri/content/' + $scope.userLanguage + '/common/footer.json';
    $http.get(footerContentPath).success(function (footerContentResult) {
        $scope.footer = footerContentResult[0];
        debugger;
    });
});

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function ($scope, $location, $routeParams, $http) {
    console.log("Page Controller reporting for duty.");
    debugger;
    $scope.pageContent2 = 'petri';
    var pageContentPath = '/casaPetri/content/' + getLanguage($routeParams.lang) + $location.$$path + 'pageContent.json';
    $http.get(pageContentPath).success(function (pageContentResult) {
        $scope.pageContent = pageContentResult[0];
    });
});

function getLanguage(langUrlParam) {
    if (langUrlParam == null) {
        var browserLang = navigator.language || navigator.userLanguage;
        if (browserLang == RO_LOCALE) {
            return RO_LOCALE;
        } else {
            alert("English not ready");
            // should return EN_LOCALE ... but en content is not yet added
            return RO_LOCALE;
        }
    } else {
        return langUrlParam;
    }
}