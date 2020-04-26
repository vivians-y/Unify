let map, infoWindow;
// makeAllMarkers();
function initMap() {
    // map = new google.maps.Map(document.getElementById('map'), {
    //     center: {lat: 29.7604, lng: -95.3698},
    //     zoom: 7
    // });
    // var directionsService = new google.maps.DirectionsService();
    // var directionsRenderer = new google.maps.DirectionsRenderer();
    //showDist(29.7604,-95.3698,30.6280,-96.3344,directionsService,directionsRenderer)
    // map = new google.maps.Map(document.getElementById('map'), {
    //     center: {lat: -34.397, lng: 150.644},
    //     zoom: 6
    // });
    // var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
    // var mapOptions = {
    //     zoom: 4,
    //     center: myLatlng
    // }
    // var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    //
    // var marker = new google.maps.Marker({
    //     position: myLatlng,
    //     title:"Hello World!"
    // });

// To add the marker to the map, call setMap();
    marker.setMap(map);
    //
    // let org1 = new google.maps.LatLng(29.7604,-95.3698);
    // let dest1 = new google.maps.LatLng(30.6280,-96.3344);
    // let originArr = [org1];
    // let destinationArr = [dest1];
    // //let distanceCalculated = calcDistWithLatLon(29.7604, -95.3698,30.6280,-96.3344);
    // infoWindow = new google.maps.InfoWindow;
    //console.log("the distance calculated is:"+distanceCalculated);
    // Try HTML5 geolocation.
    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //         var pos = {
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude
    //         };
    //
    //         infoWindow.setPosition(pos);
    //         infoWindow.setContent('Location found.');
    //         infoWindow.open(map);
    //         map.setCenter(pos);
    //     }, function() {
    //         handleLocationError(true, infoWindow, map.getCenter());
    //     });
    // } else {
    //     // Browser doesn't support Geolocation
    //     handleLocationError(false, infoWindow, map.getCenter());
    // }
    //
    // var mapOptions = {
    //     zoom:7,
    //     center: {lat: 29.7604, lng: -95.3698}
    // }
    //console.log("HI1132e4"+distances[0]);
    //var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    //directionsRenderer.setMap(map);

}
function makeAllMarkers(){
    getAllTasks(function (tasksOut) {
        // console.log("loadAllTasks callback");
        let currUser = JSON.parse(sessionStorage.getItem("currentUser"));
        let startLat=0;
        let startLon=0;
        if (currUser.latitude != null && currUser.longitude != null && currUser.latitude != -1 && currUser.longitude != -1) {
            startLat = currUser.latitude;
            startLon = currUser.longitude;
        }
        let mapOptions = {
            zoom: 4,
            center: new google.maps.LatLng(startLat,startLon)
        };
        let map = new google.maps.Map(document.getElementById("map"), mapOptions);

        let markers = [];
        let tasks = tasksOut;
        for(let i = 0; i<tasks.length;i++){
            if(tasks[i].taskLatitude==-1||tasks[i].taskLatitude==null||tasks[i].taskLongitude==0||tasks[i].taskLatitude==null){
                let currLatLng = new google.maps.LatLng(tasks[i].taskLatitude,tasks[i].taskLongitude);
                let currMarker = new google.maps.Marker({
                    position: currLatLng,
                    title:tasks[i].taskName
                });
                currMarker.setMap(map);
            }
        }
    });
}
function getCurrPos(callback){
    // Try HTML5 geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            callback(pos);
        }, function() {
            console.log("Browser could not find your location");
            callback(-1);
        });
    } else {
        // Browser doesn't support Geolocation
        console.log("Browser could not find your location because it was blocked or does not support.");
        callback(-1);
    }
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
        giveDist(distances[i][0])
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
function giveDist(distanceArr){
    return distanceArr[0][0];
}
function calcDistWithLatLon(lat1,long1,lat2,long2, callbackFunc){
    let origin = [new google.maps.LatLng(lat1,long1)];
    let dest = [new google.maps.LatLng(lat2,long2)];
    calcDist(origin,dest, function (response, status) {
        let distArr = callback(response, status);
        callbackFunc(giveDist(distArr));
    });
}
function calcDist(originArr, destinationArr, callbackFunc){
    console.log(originArr);
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
        {
            origins: originArr,
            destinations: destinationArr,
            travelMode: 'DRIVING',
            // transitOptions: TransitOptions,
            // drivingOptions: DrivingOptions,
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            avoidHighways: false,
            avoidTolls: false
        }, callbackFunc);
    //let gay = distancesArr
}
function callback(response, status) {
    try {
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
                    let currDist = [distance, duration, from, to];
                    distancesArr.push(currDist);
                    //console.log(distance);
                }
            }
            // printDistances(distancesArr);
            return distancesArr;
        }
    }
    catch (e) {
        return [[""]];
    }
}
