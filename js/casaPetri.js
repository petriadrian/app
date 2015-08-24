$('.nav a').on('click', function(){
   $(".navbar-toggle").click()
});

function getParameterFromUrl(name) {
   name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
   var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
       results = regex.exec(location.search);
   return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Unused functions
// Add active when a button clicked
//    $(document).ready(function () {
//   $('ul.nav > li').click(function (e) {
//       $('ul.nav > li').removeClass('active');
//       $(this).addClass('active');
//   });
//});