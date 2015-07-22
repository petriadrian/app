$('.carousel').carousel({
	interval : 16000
});

$('.nav a').on('click', function(){
   $(".navbar-toggle").click()
});

// Unuused functions
// Add active when a button clicked
//    $(document).ready(function () {
//   $('ul.nav > li').click(function (e) {
//       $('ul.nav > li').removeClass('active');
//       $(this).addClass('active');
//   });
//});