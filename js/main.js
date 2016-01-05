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
    //get Articles function
    $rootScope.getArticles = function (categoryArticles, idsOfTheNeededArticles) {
        var path = 'content/' + 'ro' + '/common/articles/' + categoryArticles + '.json';
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
    };

    // process form requests
    $rootScope.formData = {};
    $rootScope.sendEmailFromForm = function (formTitle, successMessage) {
        $rootScope.formLoading = true;
        $rootScope.formData.title = formTitle;
        debugger;
        $.ajax({
            type: 'POST',
            url: 'js/send_mail.php',
            data: $rootScope.formData,
            dataType: 'json',
            success: function (data) {
                for (var field in $rootScope.formData) {
                    $rootScope.formData[field] = '';
                }
                $rootScope.formData = {};
                $rootScope.formLoading = false;
                alert(successMessage);
            },
            error: function(errorThrown) {
                for (var field in $rootScope.formData) {
                    $rootScope.formData[field] = '';
                }
                $rootScope.formData = {};
                $rootScope.formLoading = false;
                alert(successMessage);
            }
        });
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

        .when("/accommodation/facilities", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})
        .when("/accommodation/camping", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})
        .when("/accommodation/rooms", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})

        .when("/activities/hiking", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/historicalCenter", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/carnic", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/romanGalleries", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/weatherStation", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/letySulei", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/topAttractions", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/detunata", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/geamana", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})

        .when("/activities/cycling", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/fourLakes", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/rollerCoaster", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/vulcan", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/zlatnaPool", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/scarisoara", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})

        .when("/recommendations/steamTrain", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})
        .when("/recommendations/daffodilMeadow", {templateUrl: "partials/home.html", controller: "DefaultPageCtrl"})
        //// else 404
        .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

/**
 * Controllers
 */
app.controller('DefaultPageCtrl', function ($scope, $rootScope, $location, $routeParams, $http, $timeout, $anchorScroll, localizationService) {
    var pageSuffix;
    if ($location.$$path == '/') {
        pageSuffix = '/home';
    } else {
        pageSuffix = $location.$$path;
    }
    var pageContentPath = 'content/' + 'ro' + pageSuffix + '.json';
    $http.get(pageContentPath).success(function (pageContentResult) {
        $scope.pageContent = pageContentResult;
    });
    if ($location.hash()) {
        $timeout(function () {
            $anchorScroll($location.hash());
        }, 1200);
    }

    // localization
    $scope.localizationService = localizationService;
    $scope.$watch('localizationService.language', function (oldVal, newVal) {
        if (!angular.isUndefined(oldVal) && oldVal != newVal) {
            $scope.reloadContent(newVal);
        }
    });
    $scope.reloadContent = function (language) {
        console.log('content of site not ready yet');
    };
});

app.controller('HeaderCtrl', function ($scope, $rootScope, $window, $http, $location, localizationService) {

    var headerContentPath = 'content/' + localizationService.language + '/common/header.json';
    $http.get(headerContentPath).success(function (headerContentResult) {
        $scope.headerContent = headerContentResult;
    });

    // localization
    $scope.localizationService = localizationService;
    $scope.$watch('localizationService.language', function (newVal, oldVal) {
        if (!angular.isUndefined(oldVal) && oldVal != newVal) {
            $scope.reloadContent(newVal);
        }
    });
    $scope.reloadContent = function (newLanguage) {
        $rootScope.userLanguage = newLanguage;
        var headerContentPath = 'content/' + newLanguage + '/common/header.json';
        $http.get(headerContentPath).success(function (headerContentResult) {
            $scope.headerContent = headerContentResult;
        });
    };

    //redirect or just scroll from header buttons
    $scope.redirectOrScroll = function (url) {
        if ($location.$$path == '/') {
            $rootScope.scrollTo((url.link).substring((url.link).lastIndexOf("#") + 1))
        } else {
            $rootScope.openUrl(url)
        }
    }
});

app.controller('FooterCtrl', function ($scope, $rootScope, $http, $timeout, localizationService) {

    var reviewsPagePath = 'content/' + 'ro' + '/reviews.json';
    $http.get(reviewsPagePath).success(function (reviewPageContent) {
        $scope.reviewPresentation = reviewPageContent.presentation;
    });
    var reviewsArticlesPath = 'content/' + 'ro' + '/common/articles/reviews.json';
    $http.get(reviewsArticlesPath).success(function (reviewArticles) {
        $scope.reviews = reviewArticles;
    });
    var footerContentPath = 'content/' + localizationService.language + '/common/footer.json';
    $http.get(footerContentPath).success(function (footerContentResult) {
        $scope.footerContent = footerContentResult;
    });

    // localization
    $scope.localizationService = localizationService;
    $scope.$watch('localizationService.language', function (newVal, oldVal) {
        if (!angular.isUndefined(oldVal) && oldVal != newVal) {
            $scope.reloadContent(newVal);
        }
    });
    $scope.reloadContent = function (newLanguage) {
        console.log('language changed: footer');
        $rootScope.userLanguage = newLanguage;
        var footerContentPath = 'content/' + newLanguage + '/common/footer.json';
        $http.get(footerContentPath).success(function (footerContentResult) {
            $scope.footerContent = footerContentResult;
        });
    };
});

app.controller('GetPagePresentationCtrl', function ($scope, $rootScope, $http) {

    var pageToLoadPath = 'content/' + 'ro' + $scope.pagePresentationPath + '.json';
    $http.get(pageToLoadPath).success(function (pageResult) {
        $scope.pagePresentation = pageResult.presentation;
    });
});

app.controller('GetCategoryArticlesCtrl', function ($scope, $rootScope) {
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

function toggleForm(button) {
    $('input[name="dataRange"]').daterangepicker();
    $(button.parentNode).find(".hideElement").toggle(300);
}

app.factory('localizationService', function () {
    var factory = {};
    factory.language = navigator.language || navigator.userLanguage;
    if (factory.language != RO_LOCALE) {
        factory.language = EN_LOCALE;
    }
    factory.changeLanguage = function (lang) {
        console.log('changeLanguage', lang);
        this.language = lang;
    };
    return factory;
});