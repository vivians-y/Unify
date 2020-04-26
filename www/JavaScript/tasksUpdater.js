// updates all le tasks in tasks.html
let idx = 0;

let currentTasks = [];

let allTasks = [];

let allDistances = [];

let currIdx = [];

const maxItemsOnPage = 15;

resetTasks();

function resetTasks(){
    idx = 0;

    currentTasks = [];

    allTasks = [];

    currIdx = [];

    loadAllTasks();
}

function loadAllTasks(){
    getAllTasks(function (tasksOut) {
        // console.log("loadAllTasks callback");
        allTasks = tasksOut;

        // load users
        getAllUsers(function (usersOut) {
            loadNextTen(usersOut);
        });
    });
}

function loadNextTen(users) {
    getCurrPos(function (pos) {
        // update allDistances array
        for (let i = 0; i < allTasks.length; i++) {
            allDistances.push("");

            if(pos !== -1) {
                let tLat = allTasks[i].taskLatitude;
                let tLong = allTasks[i].taskLongitude;
                if(tLat != null && tLat != undefined && tLong != null && tLong != undefined && !isNaN(tLat) && !isNaN(tLong)) {
                    console.log(`i: ${i}, tLat: ${tLat}, tLong: ${tLong}, pos.lat: ${pos.lat}, pos.lng: ${pos.lng}`);
                    if(typeof tLat != "number"){
                        tLat = parseFloat(tLat);
                    }
                    if(typeof tLong != "number"){
                        tLong = parseFloat(tLong);
                    }
                    try {
                        calcDistWithLatLon(pos.lat, pos.lng, tLat, tLong, function (distanceOut) {
                            allDistances[i] = distanceOut;
                            if (i == allTasks.length - 1) {
                                loadNextTen2(pos, users);
                            }
                        });
                    }
                    catch (e) {

                    }
                }
                else{
                    if(i == allTasks.length-1){
                        loadNextTen2(pos, users);
                    }
                }
            }
            else{
                if(i == allTasks.length-1){
                    loadNextTen2(pos, users);
                }
            }
        }
    });
}

function loadNextTen2(currPos, users) {
    console.log("Top of loadNextTen2");
    console.log("distances: " + allDistances.toString());

    // filters
    let filterList = [];
    let divs = document.getElementById("task-filters").getElementsByTagName("div");
    console.log("divs.length: " + divs.length);
    for (let i = 0; i < divs.length-1; i++) {
        let option = divs[i].getElementsByTagName("select")[0].value;
        console.log(`${i}: select element: ${divs[i].getElementsByTagName("select")[0]}, option: ${option}`);
        if(option != null && option != undefined && option != "none"){
            filterList.push(option);
        }
    }

    // // debug log TODO
    // let txt = "FilterList: [";
    // for (let i = 0; i < filterList.length; i++) {
    //     txt += `${filterList[i]}, `;
    // }
    // console.log(txt + "]");

    // copy all tasks into filtered tasks
    let filteredTasks = [];
    for (let i = 0; i < allTasks.length; i++) {
        filteredTasks.push(allTasks[i]);
    }

    // filter
    for (let i = 0; i < filterList.length; i++) {
        filteredTasks = filterTasks(filteredTasks, users, filterList[i], allDistances);
    }

    // // debug log TODO
    // console.log(`filtered.len: ${filteredTasks.length}, all.len: ${allTasks.length}`);

    // sort
    // filteredTasks = sortTasks();

    for (let i = 0; i < maxItemsOnPage; i++) {
        // console.log(`top of for loop: i: ${i}, idx: ${idx}`);

        if(idx >= filteredTasks.length){
            // console.log("breaking");
            document.getElementById("task-item-container").getElementsByClassName("task-item")[i].style.display = "none";
            document.getElementById("task-item-container").getElementsByClassName("task-separator")[i].style.display = "none";
            continue;
        }
        document.getElementById("task-item-container").getElementsByClassName("task-item")[i].style.display = "";
        document.getElementById("task-item-container").getElementsByClassName("task-separator")[i].style.display = "";
        currentTasks[i] = filteredTasks[idx];
        currIdx[i] = idx;

        // console.log("blah blah, currentTasks:");
        // for (let j = 0; j < currentTasks.length; j++) {
        //     console.log(` ${j}: ${currentTasks[j]}`);
        // }

        // console.log(`curr obj: ${JSON.stringify(currentTasks[i])}`);

        // update text
        // get horizontal flex wrapper
        let e = document.getElementById("task-item-container").getElementsByClassName("task-item")[i].getElementsByClassName("horflex")[0];

        // icon name
        let a = document.getElementById("task-item-container").getElementsByClassName("task-item")[i].getElementsByClassName("hand")[0];
        a.classList.remove("volunteering");
        a.classList.remove("foodWater");
        a.classList.remove("lending");
        a.classList.remove("transport");
        if(currentTasks[i].taskType == "Volunteering"){
            a.classList.add("volunteering");
        }
        if(currentTasks[i].taskType == "Food&Water"){
            a.classList.add("foodWater");
        }
        if(currentTasks[i].taskType == "Lending"){
            a.classList.add("lending");
        }
        if(currentTasks[i].taskType == "Transport"){
            a.classList.add("transport");
        }

        // name username
        let nameUser = e.getElementsByClassName("nameUsername")[0];
        // task name
        nameUser.getElementsByTagName("h3")[0].innerText = currentTasks[i].taskName;
        // distance
        if(allDistances[currIdx[i]].length > 0){
            nameUser.getElementsByTagName("p")[0].innerText = `${allDistances[currIdx[i]]} away`;
        }
        else{
            nameUser.getElementsByTagName("p")[0].innerText = `Unknown Location`;
        }
        // if(currPos !== -1) {
        //     let tLat = currentTasks[i].taskLatitude;
        //     let tLong = currentTasks[i].taskLongitude;
        //     if(tLat != null && tLat != undefined && tLong != null && tLong != undefined && !isNaN(tLat) && !isNaN(tLong)) {
        //         if(typeof tLat != "number"){
        //             tLat = parseFloat(tLat);
        //         }
        //         if(typeof tLong != "number"){
        //             tLong = parseFloat(tLong);
        //         }
        //         calcDistWithLatLon(currPos.lat, currPos.lng, tLat, tLong, function (distanceOut) {
        //             nameUser.getElementsByTagName("p")[0].innerText = `${distanceOut} away`;
        //         });
        //     }
        // }
        // else{
        //     nameUser.getElementsByTagName("p")[0].innerText = `Unknown Location`;
        // }

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
function clearFields(){
    document.getElementById("taskName").value = "";
    document.getElementById("taskType").value = "";
    document.getElementById("taskDesc").value = "";
    document.getElementById("taskUrgency").value = "";
    document.getElementById("taskPos").value = "";
    document.getElementById("addtask").classList.remove("rotate135");
}
function submitTask2(taskName, taskType, taskDescription, taskUrgency, timestamp, currUser, taskPos, valid) {
    if (!valid) {
        return;
    }

    let newTask = new Task(taskName, currUser.username, taskType, taskDescription, taskUrgency, taskPos[1], taskPos[0], timestamp);

    pushTask(newTask, function () {
        console.log("Task pushed successfully");
        document.getElementById("taskform").style.display = "none";
        clearFields();
        resetTasks();
    });
}