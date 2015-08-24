var actual_room_number = 1;

$(".add_more_rooms").click(function(e) {
   var max_number_of_rooms = 3;
   var html_for_room = '<div class="input-group"><span class="input-group-addon"><i class="fa fa-bed"></i></span><select class="form-control" id="roomsTypeReservation"><option value="" disabled selected style="display:none;">Alege tip camera</option><option value="1">2 persoane (pat dublu)</option><option value="2">2 persoane (paturi simple)</option><option value="3">3 persoane (1 pat dublu + 1 pat simplu)</option><option value="4">3 persoane (paturi simple)</option><option value="5">4 persoane (1 pat dublu + 2 paturi simple)</option><option value="6">4 persoane (paturi simple)</option><option value="7">6 persoane (4 paturi simple + 1 pat dublu)</option></select><span class="input-group-addon remove_field"><i class="fa fa-times"></i></span></div>';
   e.preventDefault();
   if (actual_room_number < max_number_of_rooms) {
      actual_room_number++;
      $(".input_fields_wrap").append(html_for_room);
      if (actual_room_number == max_number_of_rooms) {
         $(".add_more_rooms").hide();
      }
    }
});

$(".input_fields_wrap").on("click",".remove_field", function(e){ //user click on remove text
	e.preventDefault();
	$(this).parent('div').remove();
	actual_room_number--;
	$(".add_more_rooms").show();
});

$('input[name="daterange"]').daterangepicker();