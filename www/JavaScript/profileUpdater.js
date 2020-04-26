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
if (currUser.phoneNumber != null && currUser.phoneNumber.length > 0) {
    document.getElementById("profilePhone").innerText = `Phone: ${currUser.phoneNumber}`;
} else {
    document.getElementById("profilePhone").innerText = `Phone: N/A`;
}
// location
if (currUser.latitude != null && currUser.longitude != null && currUser.latitude != -1 && currUser.longitude != -1) {
    document.getElementById("profileLocation").innerText = `Location: (${currUser.latitude}, ${currUser.longitude})`;
} else {
    document.getElementById("profileLocation").innerText = `Location: (N/A, N/A)`;
}

function showStuff() {
    if (document.getElementById("dispinfo").style.display == "none") {
        document.getElementById("dispinfo").style.display = "block";
        document.getElementById("edit").style.display = "none";
        editFields();
    } else {
        document.getElementById("dispinfo").style.display = "none";
        document.getElementById("edit").style.display = "block";
        giveTextBoxesShit();
    }
}

function giveTextBoxesShit() {
    let currUser = JSON.parse(sessionStorage.getItem("currentUser"));
// username
    document.getElementById("profileUsernameEdit").placeholder = `Username: ${currUser.username}`;
// name
    document.getElementById("profileFirstNameEdit").placeholder = `Name: ${currUser.firstName} `;
    document.getElementById("profileLastNameEdit").placeholder = `Name: ${currUser.lastName}`;

// email
    document.getElementById("profileEmailEdit").placeholder = `Email: ${currUser.email}`;
// phone
    if (currUser.phoneNumber != null && currUser.phoneNumber.length > 0) {
        document.getElementById("profilePhoneEdit").placeholder = `Phone: ${currUser.phoneNumber}`;
    } else {
        document.getElementById("profilePhoneEdit").placeholder = `Phone: N/A`;
    }
// location
    if (currUser.latitude != null && currUser.longitude != null && currUser.latitude != -1 && currUser.longitude != -1) {
        document.getElementById("profileLatitudeEdit").placeholder = `Location: ${currUser.latitude}`;
        document.getElementById("profileLongitudeEdit").placeholder = `Location: ${currUser.longitude})`;
    } else {
        document.getElementById("profileLatitudeEdit").placeholder = `Location: N/A`;
        document.getElementById("profileLongitudeEdit").placeholder = `Location: N/A`;
    }
}

function editFields() {
    let newUsername = document.getElementById("profileUsernameEdit").value;
    let newFirstName = document.getElementById("profileFirstNameEdit").value;
    let newLastName = document.getElementById("profileLastNameEdit").value;
    let newEmail = document.getElementById("profileEmailEdit").value;
    let newPhone = document.getElementById("profilePhoneEdit").value;
    let newLatitude = document.getElementById("profileLatitudeEdit").value;
    let newLongitude = document.getElementById("profileLongitudeEdit").value;
    let user = JSON.parse(sessionStorage.getItem("currentUser"));
    if(newUsername != null){
        user.username = newUsername;
    }
    if(newFirstName != null){
        user.firstName = newFirstName;
    }
    if(newLastName != null){
        user.lastName = newLastName;
    }
    if(newEmail != null){
        user.email = newEmail;
    }
    if(newPhone != null){
        user.phoneNumber = newPhone;
    }
    if(newLatitude != null){
        user.latitude = parseFloat(newLatitude);
    }
    if(newLongitude != null){
        user.longitude = parseFloat(newLongitude);
    }

    updateUser(user, function () {
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        // anything you want to do after the save here
    });
    updateFields();
}

// // to get
// let varName = JSON.parse(sessionStorage.getItem("currentUser"));
//
// // to change
// varName.firstName = newVal;
// //varName."other field (user.js)" = newVal;
//
// // to save
// updateUser(varName, function() {
//     sessionStorage.setItem("currentUser", JSON.stringify(varName));
//     // anything you want to do after the save here
// });
function updateFields() {
    let currUser = JSON.parse(sessionStorage.getItem("currentUser"));
// username
    document.getElementById("profileUsername").innerText = `Username: ${currUser.username}`;
// karma
    document.getElementById("profileKarma").innerText = `Karma: ${currUser.karma}`;
// name
    document.getElementById("profileName").innerText = `Name: ${currUser.firstName} ${currUser.lastName}`;
// email
    document.getElementById("profileEmail").innerText = `Email: ${currUser.email}`;
// phone
    if (currUser.phoneNumber != null && currUser.phoneNumber.length > 0) {
        document.getElementById("profilePhone").innerText = `Phone: ${currUser.phoneNumber}`;
    } else {
        document.getElementById("profilePhone").innerText = `Phone: N/A`;
    }
// location
    if (currUser.latitude != null && currUser.longitude != null && currUser.latitude != -1 && currUser.longitude != -1) {
        document.getElementById("profileLocation").innerText = `Location: (${currUser.latitude}, ${currUser.longitude})`;
    } else {
        document.getElementById("profileLocation").innerText = `Location: (N/A, N/A)`;
    }
}