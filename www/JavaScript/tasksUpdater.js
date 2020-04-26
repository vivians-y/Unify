// updates all le tasks in tasks.html
let idx = 0;

let currentTasks = [];

let allTasks = [];

const maxItemsOnPage = 10;

loadAllTasks();

function loadAllTasks(){
    getAllTasks(function (tasksOut) {
        console.log("loadAllTasks callback");
        allTasks = tasksOut;
        console.log("printing allTasks:");
        for (let i = 0; i < allTasks.length; i++) {
            console.log(` ${i}: ${JSON.stringify(allTasks[i])}`);
        }
        loadNextTen();
    });
}

function loadNextTen() {
    getCurrPos(function (pos) {
        console.log("loadNextTen callback");
        loadNextTen2(pos);
    });
}
function loadNextTen2(currPos) {
    console.log("Top of loadNextTen2");

    // TODO: filters
    for (let i = 0; i < maxItemsOnPage; i++) {
        console.log(`top of for loop: i: ${i}, idx: ${idx}`);

        if(idx >= allTasks.length){
            console.log("breaking");
            break;
        }
        // TODO: filter
        currentTasks[i] = allTasks[idx];

        console.log("blah blah, currentTasks:");
        for (let j = 0; j < currentTasks.length; j++) {
            console.log(` ${j}: ${currentTasks[j]}`);
        }

        console.log(`curr obj: ${JSON.stringify(currentTasks[i])}`);

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

    console.log("end of loadNextTen2");
}