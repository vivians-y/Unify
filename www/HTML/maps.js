var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 29.7604, lng: -95.3698},
        zoom: 7
    });
}