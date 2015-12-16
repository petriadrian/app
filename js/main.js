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
app.run(function ($rootScope, $window, $anchorScroll, $location, $http) {
    //set a function for opening any url in new or same tab
    $rootScope.openUrl = function (url) {
        if (typeof(url.openInNewTab) !== 'undefined' && url.openInNewTab) {
            $window.open(url.link, '_blank');
        } else {
            $window.open(url.link, '_self');
        }
    };
    $rootScope.scrollTo = function (id) {
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
    //get Articles function
    $rootScope.getArticles = function(categoryArticles, idsOfTheNeededArticles) {
        debugger;
        var path = '/casaPetri/content/' + $rootScope.userLanguage + '/common/articles/' + categoryArticles + '.json';
        var neededArticlesIds = [];
        $.each(idsOfTheNeededArticles, function (key, neededArticle) {
            neededArticlesIds.push(neededArticle.id);
        });
        var finalItems = new Array(neededArticlesIds.length);
        $http.get(path).success(function (loadedArticles) {
            $.each(loadedArticles, function (key, loadedArticle) {
                var itemPosition = neededArticlesIds.indexOf(loadedArticle.id);
                if (itemPosition > -1) {
                    finalItems[itemPosition] = loadedArticle;
                }
            });
        });
        return finalItems;
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
        .when("/reviews", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})

        .when("/activities/hiking", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/historicalCenter", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/carnic", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/romanGalleries", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/weatherStation", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/letySulei", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/topAttractions", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/detunata", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})

        .when("/activities/cycling", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})

        .when("/recommendations/steamTrain", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})
        .when("/recommendations/daffodilMeadow", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})
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
    var pageContentPath = '/casaPetri/content/' + $rootScope.userLanguage + pageSuffix + '.json';
    $http.get(pageContentPath).success(function (pageContentResult) {
        $scope.pageContent = pageContentResult;
    });
    if ($location.hash()) {
        $timeout(function () {
            $anchorScroll($location.hash());
        }, 800);
    }
});

app.controller('HeaderCtrl', function ($scope, $rootScope, $window, $http) {
    var headerContentPath = '/casaPetri/content/' + $rootScope.userLanguage + '/common/header.json';
    $http.get(headerContentPath).success(function (headerContentResult) {
        $scope.headerContent = headerContentResult;
    });
});

app.controller('FooterCtrl', function ($scope, $rootScope, $http) {
    var reviewsPath = '/casaPetri/content/' + $rootScope.userLanguage + '/reviews.json';
    debugger;
    $http.get(reviewsPath).success(function (reviewContent) {
        $scope.reviewContent = reviewContent;
        $scope.reviews = $rootScope.getArticles(reviewContent.sections[0].content.articles[0].category, reviewContent.sections[0].content.articles[0].ids);
    });
    debugger;
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

app.controller('GetArticlesCtrl', function ($scope, $rootScope) {
    $scope.categoryArticles = $rootScope.getArticles($scope.categoryArticles.category, $scope.categoryArticles.ids);

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