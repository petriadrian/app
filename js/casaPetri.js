const LANG_URL_PARAM = 'lang';
const RO_LOCALE = 'ro';
const EN_LOCALE = 'en';

// scroll to anchor again when a button from top menu is clicked
function scrollToAnchor() {
    setTimeout(function () {
        if ($(document.location.hash).offset()) {
            $(window).scrollTop($(document.location.hash).offset().top);
            console.log("You were scrolled to top " + $(document.location.hash).offset().top);
        } else {
            console.log("No url anchor to scroll at.");
        }
    }, 300);
}

// dynamicContentLoader(templatePathSuffix, contentPathSuffix, idParentElement, templateId);
function dynamicContentLoader(templatePathSuffix, contentPathSuffix, idParentElement, templateId) {
    $.get('/casaPetri/template/' + templatePathSuffix, function (template) {
        $('#' + idParentElement).append(template);
        $.get('/casaPetri/content/' + getLanguage() + '/' + contentPathSuffix, function (content) {
            $('#' + templateId).tmpl(content).appendTo('#' + idParentElement);
        })
    });
}

function htmlContentLoader(htmlPageSuffix, idParentElement) {
    $.get('/casaPetri/pages/' + htmlPageSuffix, function (content) {
        $('#' + idParentElement).append(content);
    });
}

function toggleReservationForm(button) {
    $('input[name="dataRange"]').daterangepicker();
    $(button.parentNode).find(".reservationForm").toggle(500);
}

function hideReservationForm(button) {
    $('input[name="dataRange"]').daterangepicker();
    $(button.parentNode).toggle(500);
}

function changeLanguageTo(newLang) {
    if (newLang == EN_LOCALE) {
        alert("We are sorry! The english version of this site is not ready yet.");
    }
        var currentUrl = window.location.href;
        var redirectUrl = replaceUrlParam(currentUrl, LANG_URL_PARAM, newLang);
        window.location.replace(redirectUrl);

}

function getLanguage() {
    var langUrlParam = getURLParameter(LANG_URL_PARAM);
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

function getURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

function replaceUrlParam(url, paramName, paramValue){
    var pattern = new RegExp('('+paramName+'=).*?(&|$)')
    var newUrl=url
    if(url.search(pattern)>=0){
        newUrl = url.replace(pattern,'$1' + paramValue + '$2');
    }
    else{
        newUrl = newUrl + (newUrl.indexOf('?')>0 ? '&' : '?') + paramName + '=' + paramValue
    }
    return newUrl
}


// Unused functions
// Add active when a button clicked
//    $(document).ready(function () {
//   $('ul.nav > li').click(function (e) {
//       $('ul.nav > li').removeClass('active');
//       $(this).addClass('active');
//   });
//});