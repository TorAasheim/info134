function initMap() {
       var map = new google.maps.Map(document.getElementById('map'), {
         zoom: 14,
         center: uluru
       });
       var marker = new google.maps.Marker({
         position: uluru,
         map: map
       });
     }

     function initBryggen() {
        var uluru = {lat: 60.397, lng: 5.324};
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });

     }
