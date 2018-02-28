
// initial load location and zoom for google maps
function initMap() {
      var seattle = {lat: 47.6129432, lng: -122.4821468};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: seattle
      });
      // resort markers
      var mtBaker = new google.maps.Marker({
        position: {lat: 48.8143793, lng: -121.7717526},
        map: map
      });
      var summitAtSnowqualmie = new google.maps.Marker({
        position: {lat: 47.4105905, lng: -121.4135603},
        map: map
      });
      var crystal = new google.maps.Marker({
        position: {lat: 46.9353331, lng: -121.4770354},
        map: map
      });
      var stevensPass = new google.maps.Marker({
        position: {lat: 47.7357698, lng: -121.1060072},
        map: map
      });
    }
