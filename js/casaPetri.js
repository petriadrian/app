$('.carousel').carousel({
	interval : 12000
});

$('.nav a').on('click', function(){
   $(".navbar-toggle").click()
});

// photo album slider config
$(".fancybox").fancybox({
    helpers : {
        title: {
            type: 'inside',
            position: 'bottom'
        },
        overlay : {
            css : {
                'background' : 'rgba(0, 0, 0, 0.85)'
            }
        }
    }
});
// Unused functions
// Add active when a button clicked
//    $(document).ready(function () {
//   $('ul.nav > li').click(function (e) {
//       $('ul.nav > li').removeClass('active');
//       $(this).addClass('active');
//   });
//});