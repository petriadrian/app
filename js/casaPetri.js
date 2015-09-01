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

// Unused functions
// Add active when a button clicked
//    $(document).ready(function () {
//   $('ul.nav > li').click(function (e) {
//       $('ul.nav > li').removeClass('active');
//       $(this).addClass('active');
//   });
//});