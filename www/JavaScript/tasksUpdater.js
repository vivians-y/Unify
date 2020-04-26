// updates all le tasks in tasks.html
let idx = 0;

let currentTasks = [];

let allTasks = [];

const maxItemsOnPage = 15;

resetTasks();

function resetTasks(){
    idx = 0;

    currentTasks = [];

    allTasks = [];

    loadAllTasks();
}

function loadAllTasks(){
    getAllTasks(function (tasksOut) {
        // console.log("loadAllTasks callback");
        allTasks = tasksOut;
        // console.log("printing allTasks:");
        // for (let i = 0; i < allTasks.length; i++) {
        //     console.log(` ${i}: ${JSON.stringify(allTasks[i])}`);
        // }
        loadNextTen();
    });
}

function loadNextTen() {
    getCurrPos(function (pos) {
        // console.log("loadNextTen callback");
        loadNextTen2(pos);
    });
}
function loadNextTen2(currPos) {
    // console.log("Top of loadNextTen2");

    // TODO: filters
    for (let i = 0; i < maxItemsOnPage; i++) {
        // console.log(`top of for loop: i: ${i}, idx: ${idx}`);

        if(idx >= allTasks.length){
            // console.log("breaking");
            document.getElementById("task-item-container").getElementsByClassName("task-item")[i].style.display = "none";
            document.getElementById("task-item-container").getElementsByClassName("task-separator")[i].style.display = "none";
            continue;
        }
        document.getElementById("task-item-container").getElementsByClassName("task-item")[i].style.display = "";
        document.getElementById("task-item-container").getElementsByClassName("task-separator")[i].style.display = "";
        // TODO: filter
        currentTasks[i] = allTasks[idx];

        // console.log("blah blah, currentTasks:");
        // for (let j = 0; j < currentTasks.length; j++) {
        //     console.log(` ${j}: ${currentTasks[j]}`);
        // }

        // console.log(`curr obj: ${JSON.stringify(currentTasks[i])}`);

        // update text
        // get horizontal flex wrapper
        let e = document.getElementById("task-item-container").getElementsByClassName("task-item")[i].getElementsByClassName("horflex")[0];

        // name username
        let nameUser = e.getElementsByClassName("nameUsername")[0];
        // task name
        nameUser.getElementsByTagName("h3")[0].innerText = currentTasks[i].taskName;
        // distance TODO
        if(currPos !== -1) {
            // distance can be found TODO
            nameUser.getElementsByTagName("p")[0].innerText = `Not Implemented`;
        }
        else{
            nameUser.getElementsByTagName("p")[0].innerText = `X mi away`;
        }

        // description
        e.getElementsByClassName("desc")[0].innerText = currentTasks[i].taskDescription;

        // urgency
        let urgencyDiv = e.getElementsByClassName("urgency")[0];
        // remove previous alerts
        for (let j = 0; j < 5; j++) {
            if(urgencyDiv.classList.contains(`alert${j}`)){
                urgencyDiv.classList.remove(`alert${j}`);
            }
        }
        urgencyDiv.classList.add(`alert${currentTasks[i].taskUrgency - 1}`);

        // mail phone
        let mailPhone = e.getElementsByClassName("mailPhone")[0];
        // set loading
        mailPhone.getElementsByTagName("a")[0].innerText = "loading email";
        mailPhone.getElementsByTagName("a")[1].innerText = "loading phone #";
        // find user to do
        getAllUsers(function (users) {
            // loop to find user
            for (let j = 0; j < users.length; j++) {
                if(users[j].username == currentTasks[i].taskCreatorUsername){
                    mailPhone.getElementsByTagName("a")[0].innerText = users[j].email;
                    mailPhone.getElementsByTagName("a")[1].innerText = users[j].phoneNumber;
                }
            }
        });

        idx++;
    }

    // console.log("end of loadNextTen2");
}

function submittask() {
    let taskName = document.getElementById("taskName").value;
    let taskType = document.getElementById("taskType").value;
    let taskDescription = document.getElementById("taskDesc").value;
    let taskUrgency = parseInt(document.getElementById("taskUrgency").value);
    // console.log("submittask() curr urgency: " + taskUrgency);
    let timestamp = Date.now();

    let currUser = JSON.parse(sessionStorage.getItem("currentUser"));
    /*document.getElementById("tasktitle").innerHTML ="Task: ";
    document.getElementById("locationtitle").innerHTML = "Location:";
    document.getElementById("taskdisp").innerHTML = task;
    document.getElementById("locationdisp").innerHTML = location;
    */

    let taskPos = document.getElementById("taskPos").value;

    let valid = true;
    // name
    if (taskName.length <= 0) {
        let e = document.getElementById("taskNameLabel");
        if(e.innerText.substring(0, 8) != "Invalid "){
            e.innerText = "Invalid " + e.innerText;
        }
        e.classList.add("invalidField");
        valid = false;
    }
    else{
        let e = document.getElementById("taskNameLabel");
        if(e.innerText.substring(0, 8) == "Invalid "){
            e.innerText = "Task Name:";
            e.classList.remove("invalidField");
        }
    }
    // type
    if(taskType.length <= 0){
        let e = document.getElementById("taskTypeLabel");
        if(e.innerText.substring(0, 8) != "Invalid "){
            e.innerText = "Invalid " + e.innerText;
        }
        e.classList.add("invalidField");
        valid = false;
    }
    else{
        let e = document.getElementById("taskTypeLabel");
        if(e.innerText.substring(0, 8) == "Invalid "){
            e.innerText = "Task Type:";
            e.classList.remove("invalidField");
        }
    }
    // description
    if (taskDescription.length <= 0) {
        let e = document.getElementById("taskDescLabel");
        if(e.innerText.substring(0, 8) != "Invalid "){
            e.innerText = "Invalid " + e.innerText;
        }
        e.classList.add("invalidField");
        valid = false;
    }
    else{
        let e = document.getElementById("taskDescLabel");
        if(e.innerText.substring(0, 8) == "Invalid "){
            e.innerText = "Task Description:";
            e.classList.remove("invalidField");
        }
    }
    // urgency
    if (taskUrgency == NaN) {
        let e = document.getElementById("taskUrgencyLabel");
        if(e.innerText.substring(0, 8) != "Invalid "){
            e.innerText = "Invalid " + e.innerText;
        }
        e.classList.add("invalidField");
        valid = false;
    }
    else{
        let e = document.getElementById("taskUrgencyLabel");
        if(e.innerText.substring(0, 8) == "Invalid "){
            e.innerText = "Task Urgency:";
            e.classList.remove("invalidField");
        }
    }
    // logic for task position
    if (taskPos.length > 0) {
        console.log("taskPos: " + taskPos);
        // selected user position
        if(taskPos == "User Position"){
            if(currUser.latitude != null && currUser.longitude != null && currUser.latitude != -1 && currUser.longitude != -1){
                taskPos = [currUser.latitude, currUser.longitude];
            }
            else{
                let e = document.getElementById("taskPosLabel");
                e.innerText = "Invalid: Logged-In User Has No Location";
                e.classList.add("invalidField");
                valid = false;
            }
        }
        // current location
        else if(taskPos == "Current Position"){
            console.log("hello");
            getCurrPos(function (callbackVal) {
                console.log("callback here: taskPos: " + callbackVal);
                console.log(`(${callbackVal.lat}, ${callbackVal.lng})`);
                taskPos = [callbackVal.lat, callbackVal.lng];
                if(taskPos === -1){
                    let e = document.getElementById("taskPosLabel");
                    e.innerText = "Invalid: Current Position Could Not Be Found";
                    e.classList.add("invalidField");
                    valid = false;
                }
                submitTask2(taskName, taskType, taskDescription, taskUrgency, timestamp, currUser, taskPos, valid);
            });
            return;
        }
        // other
        else{
            // TODO: search by google maps api?
            let e = document.getElementById("taskPosLabel");
            e.innerText = "Sorry, Google Maps Searching is Not Implemented Yet";
            e.classList.add("invalidField");
            valid = false;
        }
    }
    else{
        let e = document.getElementById("taskPosLabel");
        e.innerText = "Invalid Location";
        e.classList.add("invalidField");
        valid = false;
    }
    submitTask2(taskName, taskType, taskDescription, taskUrgency, timestamp, currUser, taskPos, valid);
}
function submitTask2(taskName, taskType, taskDescription, taskUrgency, timestamp, currUser, taskPos, valid) {
    if (!valid) {
        return;
    }

    let newTask = new Task(taskName, currUser.username, taskType, taskDescription, taskUrgency, taskPos[1], taskPos[0], timestamp);

    pushTask(newTask, function () {
        console.log("Task pushed successfully");
        resetTasks();
    });
}