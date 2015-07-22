$('input[name="daterange"]').daterangepicker();

$(".add_more_rooms").click(function(e) {
   var max_fields      = 3; //maximum input boxes allowed
   var selectHTML    = '<div class="input-group"><span class="input-group-addon"><i class="fa fa-bed"></i></span><select class="form-control" id="roomsTypeReservation"><option value="" disabled selected style="display:none;">Alege tip camera</option><option value="1">2 persoane (pat dublu)</option><option value="2">2 persoane (paturi simple)</option><option value="3">3 persoane (1 pat dublu + 1 pat simplu)</option><option value="4">3 persoane (paturi simple)</option><option value="5">4 persoane (1 pat dublu + 2 paturi simple)</option><option value="6">4 persoane (paturi simple)</option><option value="7">6 persoane (4 paturi simple + 1 pat dublu)</option></select><span class="input-group-addon remove_field"><i class="fa fa-times"></i></span></div>';
   var x = 1; //initial text box count
   e.preventDefault();
   if (x < max_fields) { //max input box allowed
      x++; //text box increment
      $(".input_fields_wrap").append(selectHTML); //add input box
      if (x == max_fields) {
         $(add_room).hide();
      }
    }
})

$(".input_fields_wrap").on("click",".remove_field", function(e){ //user click on remove text
	e.preventDefault();
	$(this).parent('div').remove();
	x--;
	$(add_room).show();
});