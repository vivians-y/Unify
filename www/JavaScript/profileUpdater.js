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
    document.getElementById("profileLocation").innerText = `Location: (${currUser.latitude.toFixed(3)}, ${currUser.longitude.toFixed(3)})`;
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
        document.getElementById("profileLatitudeEdit").placeholder = `Latitude: ${currUser.latitude.toFixed(3)}`;
        document.getElementById("profileLongitudeEdit").placeholder = `Longitude: ${currUser.longitude.toFixed(3)}`;
    } else {
        document.getElementById("profileLatitudeEdit").placeholder = `Latitude: N/A`;
        document.getElementById("profileLongitudeEdit").placeholder = `Longitude: N/A`;
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
    if (newFirstName != null && newFirstName.length > 0) {
        user.firstName = newFirstName;
    }
    if (newLastName != null && newLastName.length > 0) {
        user.lastName = newLastName;
    }
    if (newEmail != null && newEmail.length > 0) {
        user.email = newEmail;
    }
    if (newPhone != null && newPhone.length > 0) {
        user.phoneNumber = newPhone;
    }
    if (newLatitude != null && newLatitude.length > 0 && !isNaN(newLatitude)) {
        user.latitude = parseFloat(newLatitude);
    }
    if (newLongitude != null && newLongitude.length > 0 && !isNaN(newLongitude)) {
        user.longitude = parseFloat(newLongitude);
    }
    // username down here because you need to check if username is being used
    if (newUsername != null && newUsername.length > 0) {
        console.log("checking old users");
        // check old usernames
        getAllUsers(function (oldUsers) {
            console.log("getAllUsers callback");

            // loop through old users
            for (let i = 0; i < oldUsers.length; i++) {
                if (oldUsers[i].username == newUsername) {
                    // duplicate username
                    console.log("new username already taken");
                    return;
                }
            }

            // newUsername is unique
            console.log("new username has no match");
            let oldUsername = user.username;
            user.username = newUsername;

            updateUser(user, function () {
                sessionStorage.setItem("currentUser", JSON.stringify(user));
                // anything you want to do after the save here
                updateFields();

                // update all the tasks with new username
                getAllTasks(function (allTasks) {
                    for (let i = 0; i < allTasks.length; i++) {
                        if (allTasks[i].taskCreatorUsername == oldUsername) {
                            allTasks[i].taskCreatorUsername = newUsername;

                            updateTask(allTasks[i], function () {
                                console.log("task updated");
                            });
                        }
                    }
                })
            });
        });
        updateUser(user, function () {
            sessionStorage.setItem("currentUser", JSON.stringify(user));
            // anything you want to do after the save here
            updateFields();
        });
    } else {
        // don't need to change username
        console.log("username else");
        updateUser(user, function () {
            sessionStorage.setItem("currentUser", JSON.stringify(user));
            // anything you want to do after the save here
            updateFields();
        });
    }
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
        document.getElementById("profileLocation").innerText = `Location: (${currUser.latitude.toFixed(3)}, ${currUser.longitude.toFixed(3)})`;
    } else {
        document.getElementById("profileLocation").innerText = `Location: (N/A, N/A)`;
    }
}

function updateLoc() {
    getCurrPos(callBackCoolBoy);
}

function callBackCoolBoy(valout) {

    let user1 = JSON.parse(sessionStorage.getItem("currentUser"));

// to change
    user1.latitude = valout.lat;
    user1.longitude = valout.lng;
//varName."other field (user.js)" = newVal;

// to save
    updateUser(user1, function () {
        sessionStorage.setItem("currentUser", JSON.stringify(user1));
        // anything you want to do after the save here
        updateFields();
    });
}