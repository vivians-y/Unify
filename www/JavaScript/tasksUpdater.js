// updates all le tasks in tasks.html
let idx = 0;

let currentTasks = [];

let allTasks = [];

function loadAllTasks(){
    getAllTasks(function (tasksOut) {
        allTasks = tasksOut;
        loadNextTen();
    });
}

function loadNextTen() {
    for (let i = 0; i < 10; i++) {
        // TODO: filters
        currentTasks[i] = allTasks[idx];

        // update text
        let e = document.getElementById(`task${i}`);
        // TODO

        idx++;
    }
}