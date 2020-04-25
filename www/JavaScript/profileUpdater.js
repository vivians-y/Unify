// updates the profile.html fields
let currUser = sessionStorage.getItem("currentUser");

// username
document.getElementById("profileUsername").innerText = `Username: ${currUser.username}`;
// karma
document.getElementById("profileKarma").innerText = `Karma: ${currUser.karma}`;
// name
document.getElementById("profileName").innerText = `Name: ${currUser.firstName} ${currUser.lastName}`;
// email
document.getElementById("profileEmail").innerText = `Email: ${currUser.email}`;