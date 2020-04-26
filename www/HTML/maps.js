let map, infoWindow;
function initMap() {
    // map = new google.maps.Map(document.getElementById('map'), {
    //     center: {lat: 29.7604, lng: -95.3698},
    //     zoom: 7
    // });
    // var directionsService = new google.maps.DirectionsService();
    // var directionsRenderer = new google.maps.DirectionsRenderer();
    //showDist(29.7604,-95.3698,30.6280,-96.3344,directionsService,directionsRenderer)
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 6
    });
    let org1 = new google.maps.LatLng(29.7604,-95.3698);
    let dest1 = new google.maps.LatLng(30.6280,-96.3344);
    let originArr = [org1];
    let destinationArr = [dest1];
    //calcDist(originArr, destinationArr);
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    var mapOptions = {
        zoom:7,
        center: {lat: 29.7604, lng: -95.3698}
    }
    //console.log("HI1132e4"+distances[0]);
    //var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    //directionsRenderer.setMap(map);

}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
function printDistances(distances){
    console.log(distances.length);
    for(let i = 0; i<distances.length;i++){
        for(let j = 0; j<distances[i].length; j++) {
            console.log("HI"+distances[i][j]);
        }
    }

}
function showDist(latitude1,longitude1,latitude2,longitude2,directionsServiceT,directionsRendererT){

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

function calcDist(originArr, destinationArr){

    console.log(originArr);
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
        {
            origins: originArr,
            destinations: destinationArr,
            travelMode: 'DRIVING',
            // transitOptions: TransitOptions,
            // drivingOptions: DrivingOptions,
            // unitSystem: UnitSystem,
            avoidHighways: false,
            avoidTolls: false
        }, callback);
    //let gay = distancesArr
}
function callback(response, status) {
    if (status == 'OK') {
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;
        let distancesArr = [];
        for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            for (var j = 0; j < results.length; j++) {
                var element = results[j];
                var distance = element.distance.text;
                var duration = element.duration.text;
                var from = origins[i];
                var to = destinations[j];
                let currDist = [distance,duration,from,to];
                distancesArr.push(currDist);
                console.log(distance);
            }
        }
        printDistances(distancesArr);
    }

}
