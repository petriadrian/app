// scroll to anchor again when a button from top menu is clicked
function scrollToAnchor() {
    setTimeout(function () {
        if ($(document.location.hash).offset()) {
            $(document.body).scrollTop($(document.location.hash).offset().top);
            console.log("top " + $(document.location.hash).offset().top);
        } else {
            console.log("error");
        }
    }, 500);
}

// dynamicContentLoader(templatePathSuffix, contentPathSuffix, idParentElement, templateId);
function dynamicContentLoader(templatePathSuffix, contentPathSuffix, idParentElement, templateId) {
    $.get('/casaPetri/template/' + templatePathSuffix, function (template) {
        $('#' + idParentElement).append(template);
        $.get('/casaPetri/content/' + contentPathSuffix, function (content) {
            $('#' + templateId).tmpl(content).appendTo('#' + idParentElement);
        })
    });
}

// Unused functions
// Add active when a button clicked
//    $(document).ready(function () {
//   $('ul.nav > li').click(function (e) {
//       $('ul.nav > li').removeClass('active');
//       $(this).addClass('active');
//   });
//});