// create new account
function submitcreate() {
    let fn = document.getElementById("fname").value;
    let ln = document.getElementById("lname").value;
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    let valid = true;
    // input validation
    if (fn.length <= 0 || fn.includes(":") || fn.includes(";")) {
        let e = document.getElementById("fnameLabel");
        if(e.innerText.substring(0, 8) != "Invalid"){
            e.innerText = "Invalid " + e.innerText;
        }
        e.classList.add("invalidField");
        valid = false;
    }
    if (ln.length <= 0 || ln.includes(":") || ln.includes(";")) {
        let e = document.getElementById("lnameLabel");
        if(e.innerText.substring(0, 8) != "Invalid"){
            e.innerText = "Invalid " + e.innerText;
        }
        e.classList.add("invalidField");
        valid = false;
    }
    if (user.length <= 0 || user.includes(":") || user.includes(";")) {
        let e = document.getElementById("usernameLabel");
        if(e.innerText.substring(0, 8) != "Invalid"){
            e.innerText = "Invalid " + e.innerText;
        }
        e.classList.add("invalidField");
        valid = false;
    }
    if (pass.length <= 0 || pass.includes(":") || pass.includes(";")) {
        let e = document.getElementById("passwordLabel");
        if(e.innerText.substring(0, 8) != "Invalid"){
            e.innerText = "Invalid " + e.innerText;
        }
        e.classList.add("invalidField");
        valid = false;
    }
    if (email.length <= 0 || email.includes(":") || email.includes(";")) {
        let e = document.getElementById("emailLabel");
        if(e.innerText.substring(0, 8) != "Invalid"){
            e.innerText = "Invalid " + e.innerText;
        }
        e.classList.add("invalidField");
        valid = false;
    }
    // if(phone.length <= 0 || phone.includes(":") || phone.includes(";")){
    //     let e = document.getElementById("phoneLabel");
    //     e.innerText = "Invalid " + e.innerText;
    //     e.classList.add("invalidField");
    //     valid = false;
    // }
    if (!valid) {
        return;
    }

    let newUser = new User(fn, ln, user, pass, email, phone);

    getAllUsers(function (prevUsers) {
        submitcreate2(newUser, prevUsers);
    });
}

// callback because getAllUsers is asynchoronous :/
function submitcreate2(newUser, prevUsers) {
    console.log("submitcreate2");

    for (let i = 0; i < prevUsers.length; i++) {
        if (prevUsers[i].username == newUser.username) {
            let e = document.getElementById("usernameLabel");
            e.innerText = "Username Already Taken";
            e.classList.add("invalidField");
            return;
        }
    }

    pushUser(newUser, function () {
        console.log("User set to: " + newUser.username);
        // save user
        sessionStorage.setItem("currentUser", JSON.stringify(newUser));
        window.location.href = "./HTML/tasks.html";
    });

    // TODO: pass on user information to next page
    // window.location.href = "./HTML/profile.html";
}

function submittask() {
    let taskName = document.getElementById("taskName").value;
    let taskType = document.getElementById("taskType").value;
    let taskDescription = document.getElementById("taskDescription").value;
    let taskUrgency = document.getElementById("taskUrgency").value;
    let timestamp = Date.now();
    let taskLongitude = getLongitude();
    let taskLatitude = getLatitude();

    let currUser = JSON.parse(sessionStorage.getItem("currentUser"));
    /*document.getElementById("tasktitle").innerHTML ="Task: ";
    document.getElementById("locationtitle").innerHTML = "Location:";
    document.getElementById("taskdisp").innerHTML = task;
    document.getElementById("locationdisp").innerHTML = location;
    */

    let valid = true;
    if (taskName.length <= 0) {
        let e = document.getElementById("taskNameLabel");
        if(e.innerText.substring(0, 8) != "Invalid"){
            e.innerText = "Invalid " + e.innerText;
        }
        e.classList.add("invalidField");
        valid = false;
    }
    if (taskDescription.length <= 0) {
        let e = document.getElementById("taskDescriptionLabel");
        if(e.innerText.substring(0, 8) != "Invalid"){
            e.innerText = "Invalid " + e.innerText;
        }
        e.classList.add("invalidField");
        valid = false;
    }
    if (!valid) {
        return;
    }

    let newTask = new Task(taskName, currUser.username, taskType, taskDescription, taskUrgency, taskLongitude, taskLatitude, timestamp);

    pushTask(newTask, function () {
        console.log("Task pushed successfully");
    });
}

function submitsignin() {
    let user = document.getElementById("eusername").value;
    let password = document.getElementById("epassword").value;

    let valid = true;
    // input validation
    if (user.length <= 0 || user.includes(":") || user.includes(";")) {
        let e = document.getElementById("eusernameLabel");
        e.innerText = "Invalid " + e.innerText;
        e.classList.add("invalidField");
        valid = false;
    }
    if (password.length <= 0 || password.includes(":") || password.includes(";")) {
        let e = document.getElementById("epasswordLabel");
        e.innerText = "Invalid " + e.innerText;
        e.classList.add("invalidField");
        valid = false;
    }
    if (!valid) {
        return;
    }

    getAllUsers(function (prevUsers) {
        submitsignin2(user, password, prevUsers);
    });
}

// callback because getAllUsers is asynchoronous :/
function submitsignin2(username, password, prevUsers) {
    let newUser = null;
    for (let i = 0; i < prevUsers.length; i++) {
        console.log(`curr: user: ${prevUsers[i].username}, pass: ${prevUsers[i].passw}`);
        console.log(`new: user: ${username}, pass: ${password}`);
        if (prevUsers[i].username == username && prevUsers[i].passw == password) {
            newUser = prevUsers[i];
            console.log("matching info");
            break;
        }
    }
    if (newUser == null) {
        console.log("Incorrect login");
        let e = document.getElementById("eusernameLabel");
        e.innerText = "Incorrect Username/Password";
        e.classList.add("invalidField");
        e = document.getElementById("epasswordLabel");
        e.innerText = "Incorrect Username/Password";
        e.classList.add("invalidField");
        return;
    }

    console.log("User set to: " + username);
    // save user
    sessionStorage.setItem("currentUser", JSON.stringify(newUser));
    window.location.href = "./HTML/tasks.html";
}

function createopen() {
    document.getElementById("landing").style.display = "none";
    document.getElementById("create").style.display = "block";
}

function signinopen() {
    document.getElementById("landing").style.display = "none";
    document.getElementById("sign-in").style.display = "block";
}

function fadeout() {
    document.getElementById("landing").classList.add("fade-out");
}

function createtask() {
    let x = document.getElementById("taskform");
    let y = document.getElementById("addtask");
    if (x.style.display == undefined || x.style.display == "none") {
        x.style.display = "block";
        y.classList.add("rotate135");
    }
    else {
        x.style.display = "none";
        y.classList.remove("rotate135");
    }
}

function searchopen() {
    let y = document.getElementById("searchbox");
    let x = document.getElementById("search_open");
    console.log("hello");
    if (y.style.display == undefined || y.style.display == "none") {
        y.style.display = "block";
        x.style.opacity="1";
    }
    else {
        y.style.display = "none";
        x.style.opacity=".8";
    }
}