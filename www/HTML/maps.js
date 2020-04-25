
function initMap() {
    // map = new google.maps.Map(document.getElementById('map'), {
    //     center: {lat: 29.7604, lng: -95.3698},
    //     zoom: 7
    // });
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    calcDistance(29.7604,-95.3698,30.6280,-96.3344,directionsService,directionsRenderer)
    var mapOptions = {
        zoom:7,
        center: {lat: 29.7604, lng: -95.3698}
    }

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsRenderer.setMap(map);
}
function calcDistance(latitude1,longitude1,latitude2,longitude2,directionsServiceT,directionsRendererT){

    var loc1 = new google.maps.LatLng(latitude1,longitude1);
    var loc2 = new google.maps.LatLng(latitude2,longitude2);
    var request = {
        origin:loc1,
        destination: loc2,
        travelMode: 'DRIVING'
    };
    directionsServiceT.route(request, function(result, status) {
        if (status == 'OK') {
            directionsRendererT.setDirections(result);
        }
    });
}
