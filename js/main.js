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
        //.when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
        //.when("/faq", {templateUrl: "partials/faq.html", controller: "PageCtrl"})
        //.when("/pricing", {templateUrl: "partials/pricing.html", controller: "PageCtrl"})
        //.when("/services", {templateUrl: "partials/services.html", controller: "PageCtrl"})
        //.when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
        //// Blog
        //.when("/blog", {templateUrl: "partials/blog.html", controller: "BlogCtrl"})
        //.when("/blog/post", {templateUrl: "partials/blog_item.html", controller: "BlogCtrl"})
        //// else 404
        .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

/**
 * Controls the Blog
 */
app.controller('HeaderAndFooterCtrl', function ( $scope, $location, $routeParams, $http) {
    console.log("Blog Controller reporting for duty.");
    debugger;
    $scope.language = getLanguage($routeParams.lang);
    var pageContentPath = '/casaPetri/content/' + $scope.language  + '/homePageContent.json';
    $http.get(pageContentPath).success(function (pageContentResult) {
        $scope.pageContent = pageContentResult[0];
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
            // should return EN_LOCALE ... but en content is not yet added
            return RO_LOCALE;
        }
    } else {
        return langUrlParam;
    }
}