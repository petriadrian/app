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
app.run(function ($rootScope, $window, $anchorScroll, $location, $http, localizationService) {
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
        var path = 'content/' + localizationService.language + '/common/articles/' + categoryArticles + '.json';
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

    // localization
    $rootScope.localizationService = localizationService;

    //google analytics
    $window.ga('create', 'UA-72421107-1', 'auto');
    $rootScope.$on('$routeChangeSuccess', function(event, toState){
        $window.ga('send', 'pageview', { page: $location.path() });
    });
});

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        // Home
        .when("/", {templateUrl: "partials/defaultTemplate.html", controller: "DefaultPageCtrl"})
        //// Pages
        .when("/review", {templateUrl: "partials/defaultTemplate.html", controller: "DefaultPageCtrl"})

        .when("/accommodation/facilities", {templateUrl: "partials/defaultTemplate.html", controller: "DefaultPageCtrl"})
        .when("/accommodation/camping", {templateUrl: "partials/defaultTemplate.html", controller: "DefaultPageCtrl"})
        .when("/accommodation/rooms", {templateUrl: "partials/defaultTemplate.html", controller: "DefaultPageCtrl"})

        .when("/activities/hiking", {templateUrl: "partials/defaultTemplate.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/historicalCenter", {templateUrl: "partials/defaultTemplate.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/carnic", {templateUrl: "partials/defaultTemplate.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/romanGalleries", {templateUrl: "partials/defaultTemplate.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/weatherStation", {templateUrl: "partials/defaultTemplate.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/letySulei", {templateUrl: "partials/defaultTemplate.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/topAttractions", {templateUrl: "partials/defaultTemplate.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/detunata", {templateUrl: "partials/defaultTemplate.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/geamana", {templateUrl: "partials/defaultTemplate.html", controller: "DefaultPageCtrl"})

        .when("/activities/cycling", {templateUrl: "partials/defaultTemplate.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/fourLakes", {templateUrl: "partials/defaultTemplate.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/rollerCoaster", {templateUrl: "partials/defaultTemplate.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/vulcan", {templateUrl: "partials/defaultTemplate.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/zlatnaPool", {templateUrl: "partials/defaultTemplate.html", controller: "DefaultPageCtrl"})
        .when("/activities/trails/scarisoara", {templateUrl: "partials/defaultTemplate.html", controller: "DefaultPageCtrl"})

        .when("/recommendations/steamTrain", {templateUrl: "partials/defaultTemplate.html", controller: "DefaultPageCtrl"})
        .when("/recommendations/daffodilMeadow", {templateUrl: "partials/defaultTemplate.html", controller: "DefaultPageCtrl"})
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
    var pageContentPath = 'content/' + localizationService.language + pageSuffix + '.json';
    $http.get(pageContentPath).success(function (pageContentResult) {
        $scope.pageContent = pageContentResult;
    });
    if ($location.hash()) {
        $timeout(function () {
            $anchorScroll($location.hash());
        }, 1200);
    }

    // localization
    $scope.$watch('localizationService.language', function (newVal, oldVal) {
        if (!angular.isUndefined(oldVal) && oldVal != newVal) {
            $scope.reloadContent(newVal);
        }
    });
    $scope.reloadContent = function (newLanguage) {
        if ($location.$$path == '/') {
            pageSuffix = '/home';
        } else {
            pageSuffix = $location.$$path;
        }
        var translatedContentPath = 'content/' + newLanguage + pageSuffix + '.json';
        $http.get(translatedContentPath).success(function (translatedContent) {
            $scope.pageContent = translatedContent;
        });
        console.log('language changed: page');
    };
});

app.controller('HeaderCtrl', function ($scope, $rootScope, $window, $http, $location, localizationService) {

    var translatedContentPath = 'content/' + localizationService.language + '/common/header.json';
    $http.get(translatedContentPath).success(function (translatedContentResult) {
        $scope.headerContent = translatedContentResult;
    });

    // localization
    $scope.$watch('localizationService.language', function (newVal, oldVal) {
        if (!angular.isUndefined(oldVal) && oldVal != newVal) {
            $scope.reloadContent(newVal);
        }
    });
    $scope.reloadContent = function (newLanguage) {
        var headerContentPath = 'content/' + newLanguage + '/common/header.json';
        $http.get(headerContentPath).success(function (headerContentResult) {
            $scope.headerContent = headerContentResult;
        });
        console.log('language changed: header');
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

    var reviewsPagePath = 'content/' + localizationService.language + '/review.json';
    $http.get(reviewsPagePath).success(function (reviewPageContent) {
        $scope.reviewPresentation = reviewPageContent.presentation;
    });
    var reviewsArticlesPath = 'content/' + localizationService.language + '/common/articles/reviews.json';
    $http.get(reviewsArticlesPath).success(function (reviewArticles) {
        $scope.reviews = reviewArticles;
    });
    var footerContentPath = 'content/' + localizationService.language + '/common/footer.json';
    $http.get(footerContentPath).success(function (footerContentResult) {
        $scope.footerContent = footerContentResult;
    });

    // localization
    $scope.$watch('localizationService.language', function (newVal, oldVal) {
        if (!angular.isUndefined(oldVal) && oldVal != newVal) {
            $scope.reloadContent(newVal);
        }
    });
    $scope.reloadContent = function (newLanguage) {
        var footerContentPath = 'content/' + newLanguage + '/common/footer.json';
        $http.get(footerContentPath).success(function (footerContentResult) {
            $scope.footerContent = footerContentResult;
        });
        var reviewsPagePath = 'content/' + newLanguage + '/review.json';
        $http.get(reviewsPagePath).success(function (reviewPageContent) {
            $scope.reviewPresentation = reviewPageContent.presentation;
        });
        var reviewsArticlesPath = 'content/' + newLanguage + '/common/articles/reviews.json';
        $http.get(reviewsArticlesPath).success(function (reviewArticles) {
            $scope.reviews = reviewArticles;
        });
        console.log('language changed: footer');
    };
});

app.controller('GetPagePresentationCtrl', function ($scope, $rootScope, $http, localizationService) {
    var pageToLoadPath = 'content/' + localizationService.language + $scope.pagePresentationPath + '.json';
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

app.filter('removeHtmlFromText', function() {
        return function(text) {
            return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
        };
    }
);

function toggleForm(button) {
    $('input[name="dataRange"]').daterangepicker();
    $(button.parentNode).find(".hideElement").toggle(300);
}

app.factory('localizationService', function () {
    var factory = {};
    factory.language = navigator.language || navigator.userLanguage;
    if (factory.language.indexOf(RO_LOCALE) > -1) {
        factory.language = RO_LOCALE;
    } else {
        factory.language = EN_LOCALE;
    }
    factory.changeLanguage = function (lang) {
        console.log('changeLanguage', lang);
        this.language = lang;
    };
    return factory;
});

app.directive('sectionForm', function ($timeout) {
   return {
       restrict: 'E',
       scope: {
           section: '='
       },
       templateUrl: 'templates/_form.tmpl.htm',
       link: function (scope, element, attrs) {
           scope.formObj = {};
           scope.responseMessage = '';
           scope.showResponse = false;
           scope.messageType = 'success';
           scope.sendEmailFromForm = function () {
               scope.formLoading = true;
               scope.formObj.title = scope.section.title;
               $.ajax({
                   type: 'POST',
                   url: 'scripts/send_mail.php',
                   data: scope.formObj,
                   dataType: 'json',
                   success: function (data){
                       for (var field in scope.formObj) {
                           scope.formObj[field] = '';
                       }
                       if(data.success == true) {
                           //success
                           console.log("sauces", data);
                           scope.showResponse = true;
                           scope.responseMessage = scope.section.successMessage;
                           scope.messageType = 'success';
                       }
                       else {
                           console.log("fail", data);
                           scope.showResponse = true;
                           scope.responseMessage = scope.section.errorMessage || "ERROR";
                           scope.messageType = 'error';
                       }
                       scope.formObj = {};
                       console.log("successfully sent form to email");
                       scope.formLoading = false;
                       $timeout(function() {
                           scope.showResponse = false;
                       }, 20000);
                   },
                   error: function(errorThrown) {
                       for (var field in scope.formObj) {
                           scope.formObj[field] = '';
                       }
                       scope.formObj = {};
                       console.log("error while sending form to email", errorThrown);
                       scope.responseMessage = scope.section.errorMessage || "ERROR";
                       scope.messageType = 'error';
                       scope.showResponse = true;
                       scope.formLoading = false;
                       $timeout(function() {
                           scope.showResponse = false;
                       }, 20000);
                   }
               });
           }
       }
   }
});

// google analytics
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');