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
app.run(function ($rootScope, $window, $anchorScroll, $location) {
    //set a function for opening any url in new or same tab
    $rootScope.openUrl = function (url) {
        if (typeof(url.openInNewTab) !== 'undefined' && url.openInNewTab) {
            $window.open(url.link, '_blank');
        } else {
            $window.open(url.link, '_self');
        }
    };
    $rootScope.scrollTo = function (id) {
        debugger;
        var old = $location.hash();
        $location.hash(id);
        $anchorScroll();
        $location.hash(old);
    };
    // set userLanguage. should run only once
    if (typeof(location.search.split('lang=')[1]) == 'undefined') {
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
        .when("/", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})
        //// Pages
        .when("/activities/hiking", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})
        //// else 404
        .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

/**
 * Controllers
 */
app.controller('DefaultPageCtrl', function ($scope, $rootScope, $location, $routeParams, $http, $timeout, $anchorScroll) {
    var pageSuffix;
    if ($location.$$path == '/') {
        pageSuffix = '/home';
    } else {
        pageSuffix = $location.$$path;
    }
    ;
    var pageContentPath = '/casaPetri/content/' + $rootScope.userLanguage + pageSuffix + '.json';
    $http.get(pageContentPath).success(function (pageContentResult) {
        $scope.pageContent = pageContentResult;
    });
    if ($location.hash()) {
        $timeout(function () {
            $anchorScroll($location.hash());
        }, 500);
    }
});

app.controller('HeaderCtrl', function ($scope, $rootScope, $window, $http) {
    var headerContentPath = '/casaPetri/content/' + $rootScope.userLanguage + '/common/header.json';
    $http.get(headerContentPath).success(function (headerContentResult) {
        $scope.headerContent = headerContentResult;
    });
});

app.controller('FooterCtrl', function ($scope, $rootScope, $http) {
    var reviewsPath = '/casaPetri/content/' + $rootScope.userLanguage + '/common/reviews.json';
    $http.get(reviewsPath).success(function (reviews) {
        $scope.reviews = reviews.sections[0].content.articles;
        $scope.reviewsUrl = reviews.url;
    });
    var footerContentPath = '/casaPetri/content/' + $rootScope.userLanguage + '/common/footer.json';
    $http.get(footerContentPath).success(function (footerContentResult) {
        $scope.footerContent = footerContentResult;
    });
});

app.controller('GetPagePresentationCtrl', function ($scope, $rootScope, $http) {
    var pageToLoadPath = '/casaPetri/content/' + $rootScope.userLanguage + $scope.pagePresentationPath + '.json';
    $http.get(pageToLoadPath).success(function (pageResult) {
        $scope.pagePresentation = pageResult.presentation;
    });
});

/**
 * Filters
 */
app.filter('trustUrl', ['$sce', function ($sce) {
    return function (url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

app.filter('trustHtml', ['$sce', function ($sce) {
    return function (html) {
        return $sce.trustAsHtml(html);
    };
}]);