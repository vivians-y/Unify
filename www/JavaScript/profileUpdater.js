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
function showStuff(){
    if(document.getElementsByClassName("dispinfo").style.display == "none"){
        document.getElementsByClassName("dispinfo").style.display = "block";
        document.getElementsByClassName("edit").style.display = "none";
        editFields();
    }
    else {
        document.getElementsByClassName("dispinfo").style.display = "none";
        document.getElementsByClassName("edit").style.display = "block";
        giveTextBoxesShit();
    }
}
function giveTextBoxesShit(){
    let currUser = JSON.parse(sessionStorage.getItem("currentUser"));
// username
    document.getElementById("profileUsernameEdit").placeholder = `Username: ${currUser.username}`;
// karma
    document.getElementById("profileKarmaEdit").placeholder = `Karma: ${currUser.karma}`;
// name
    document.getElementById("profileNameEdit").placeholder = `Name: ${currUser.firstName} ${currUser.lastName}`;
// email
    document.getElementById("profileEmailEdit").placeholder = `Email: ${currUser.email}`;
// phone
    if(currUser.phoneNumber != null && currUser.phoneNumber.length > 0) {
        document.getElementById("profilePhoneEdit").placeholder = `Phone: ${currUser.phoneNumber}`;
    }
    else{
        document.getElementById("profilePhoneEdit").placeholder = `Phone: N/A`;
    }
// location
    if(currUser.latitude != null && currUser.longitude != null && currUser.latitude != -1 && currUser.longitude != -1) {
        document.getElementById("profileLocationEdit").placeholder = `Location: (${currUser.latitude}, ${currUser.longitude})`;
    }
    else {
        document.getElementById("profileLocationEdit").placeholder = `Location: (N/A, N/A)`;
    }
}
function editFields(){
    let newUsername = document.getElementById("profileUsernameEdit");
    let newName = document.getElementById("profileNameEdit");
    let newEmail = document.getElementById("profileEmailEdit");
    let newPhone = document.getElementById("profilePhoneEdit");
    let newLocation = document.getElementById("profileLocationEdit");
    let user = JSON.parse(sessionStorage.getItem("currentUser"));
    user.firstName = newUsername;
    user.name = newName;
    user.email = newEmail;
    user.phoneNumber = newPhone;
    user.latitude = parseFloat(newLocation.split(",")[0]);
    user.longitude = parseFloat(newLocation.split(",")[1]);
    updateUser(user, function() {
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
function updateFields(){
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
}