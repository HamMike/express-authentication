
// initial load location and zoom for google maps
function initMap() {
      var seattle = {lat: 47.6129432, lng: -122.4821468};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: seattle
      });
      // resort markers
      var contentStringBaker = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Mt Baker Resort</h1>'+
      '<div id="bodyContent">'+
      '<p><a href="/forecast/48.8143793,-121.7717526"</a> '+
      'Sniff Out That Snow</p>'+
      '</div>'+
      '</div>';
      var contentStringSummit = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Summit At Snowqualmie</h1>'+
      '<div id="bodyContent">'+
      '<p><a href="/forecast/47.4105905,-121.4135603"</a> '+
      'Sniff Out That Snow</p>'+
      '</div>'+
      '</div>';
      var contentStringCrystal = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Crystal Mountain Resort</h1>'+
      '<div id="bodyContent">'+
      '<p><a href="/forecast/46.9353331,-121.4770354"</a> '+
      'Sniff Out That Snow</p>'+
      '</div>'+
      '</div>';
      var contentStringStevens = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Stevens Pass</h1>'+
      '<div id="bodyContent">'+
      '<p><a href="/forecast/47.7357698,-121.1060072"</a> '+
      'Sniff Out That Snow</p>'+
      '</div>'+
      '</div>';

      var infowindowBaker = new google.maps.InfoWindow({
        content: contentStringBaker
        });

      var infowindowSummit = new google.maps.InfoWindow({
        content: contentStringSummit
        });

      var infowindowCrystal = new google.maps.InfoWindow({
        content: contentStringCrystal
        });

      var infowindowStevens = new google.maps.InfoWindow({
        content: contentStringStevens
        });

      var mtBaker = new google.maps.Marker({
        position: {lat: 48.8143793, lng: -121.7717526},
        map: map,
        title: 'Mt Baker Resort'
      });

      var summitAtSnowqualmie = new google.maps.Marker({
        position: {lat: 47.4105905, lng: -121.4135603},
        map: map,
        title: 'Summit At Snowqualmie'
      });

      var crystal = new google.maps.Marker({
        position: {lat: 46.9353331, lng: -121.4770354},
        map: map,
        title: 'Crystal Mountain Resort'
      });

      var stevensPass = new google.maps.Marker({
        position: {lat: 47.7357698, lng: -121.1060072},
        map: map,
        title: 'Stevens Pass'
      });

      mtBaker.addListener('click', function() {
        infowindowBaker.open(map, mtBaker);
        });

      summitAtSnowqualmie.addListener('click', function() {
        infowindowSummit.open(map, summitAtSnowqualmie);
        });

      crystal.addListener('click', function() {
        infowindowCrystal.open(map, crystal);
        });

      stevensPass.addListener('click', function() {
        infowindowStevens.open(map, stevensPass);
        });

}

$('.edit-post').on('submit', function(e) {
  e.preventDefault();
  // var gameElement = $(this);
  // var gameUrl = gameElement.attr('action');
  // var gameData = gameElement.serialize();
  $.ajax({
    method: 'PUT',
    // url: gameUrl,
    // data: gameData
    url: $(this).attr('action'),
    data: {
      comment: $('#comment').val()
    }
  }).done(function(data) {
    // get data returned from the PUT route
    console.log(data);
    // or, you can redirect to another page
    window.location = '/forecast/' + $('#resortName').val();
  });
});


$('.postDelete').on('click', function(e) {
  e.preventDefault();
  $.ajax({
    method: 'DELETE',
    url: $(this).attr('href')
  }).done(function(data) {
    $(this).remove();
    window.location = window.location;
  });
});
