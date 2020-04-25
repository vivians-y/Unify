// updates the profile.html fields
let currUser = JSON.parse(sessionStorage.getItem("currentUser"));

console.log("currUser " + currUser);

// username
document.getElementById("profileUsername").innerText = `Username: ${currUser.username}`;
// karma
document.getElementById("profileKarma").innerText = `Karma: ${currUser.karma}`;
// name
document.getElementById("profileName").innerText = `Name: ${currUser.firstName} ${currUser.lastName}`;
// email
document.getElementById("profileEmail").innerText = `Email: ${currUser.email}`;
// phone
if(currUser.phoneNumber != null && currUser.phoneNumber.length > 0) {
    document.getElementById("profilePhone").innerText = `Phone: ${currUser.phoneNumber}`;
}
else{
    document.getElementById("profilePhone").innerText = `Phone: N/A`;
}
// location
if(currUser.latitude != null && currUser.longitude != null && currUser.latitude != -1 && currUser.longitude != -1) {
    document.getElementById("profileLocation").innerText = `Location: (${currUser.latitude}, ${currUser.longitude})`;
}
else {
    document.getElementById("profileLocation").innerText = `Location: (N/A, N/A)`;
}