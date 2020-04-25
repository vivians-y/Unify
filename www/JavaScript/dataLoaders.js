const userAccountDatabaseName = "userAccounts";
const taskDatabaseName = "tasks";

// pushUser(new User("Troy", "Lee", "eelyort", "password", 0));
// pushTask(new Task("Sample 1", "eelyort", "Fetch", "Please go get me food.", 0, 120, 50));

setTimeout(function () {
    console.log("timeout triggered");
    getAllUsers();
    getAllTasks();
}, 1000);

// returns an array of all users stored
function getAllUsers(){
    let db = firebase.firestore();

    // db.collection("users").get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         console.log(`${doc.id} => ${doc.data()}`);
    //         txt += `\n${doc.id} => ${doc.data()}`;
    //         console.log("hi: " + txt);
    //         document.getElementById("text").innerText = txt;
    //     });
    // });

    db.collection(userAccountDatabaseName).get().then((querySnapshot) => {
        return processUserQuery(querySnapshot);
    });
}

function processUserQuery(q) {
    let a = [];
    let arr = q.docs;

    for (let i = 0; i < arr.length; i++) {
        let curr = arr[i];
        a.push(new User(curr.get("firstName"), curr.get("lastName"), curr.get("username"), curr.get("password"), curr.id));
    }

    console.log(`Returning a: ${a}`);
    return a;
}

// adds a new user to the database all validation and duplicate checking should be done elsewhere
function pushUser(user){
    let db = firebase.firestore();

    db.collection(userAccountDatabaseName).add({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        password: user.passw,
        karma: user.karma
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

// returns an array of all tasks stored
function getAllTasks(){
    let db = firebase.firestore();

    // db.collection("users").get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         console.log(`${doc.id} => ${doc.data()}`);
    //         txt += `\n${doc.id} => ${doc.data()}`;
    //         console.log("hi: " + txt);
    //         document.getElementById("text").innerText = txt;
    //     });
    // });

    db.collection(taskDatabaseName).get().then((querySnapshot) => {
        return processUserQuery(querySnapshot);
    });
}

function processTaskQuery(q) {
    let a = [];
    let arr = q.docs;

    for (let i = 0; i < arr.length; i++) {
        let curr = arr[i];
        a.push(new Task(curr.get("taskName"), curr.get("taskCreatorUsername"), curr.get("taskType"), curr.get("taskDescription"), curr.get("taskUrgency"), curr.get("taskLongitude"), curr.get("taskLatitude")));
    }

    console.log(`Returning a: ${a}`);
    return a;
}

// adds a new user to the database all validation and duplicate checking should be done elsewhere
function pushTask(task){
    let db = firebase.firestore();

    db.collection(taskDatabaseName).add({
        taskName: task.taskName,
        taskCreatorUsername: task.taskCreatorUsername,
        taskType: task.taskType,
        taskDescription: task.taskDescription,
        taskUrgency: task.taskUrgency,
        taskLongitude: task.taskLongitude,
        taskLatitude: task.taskLatitude
    })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
}

// // Add a second document with a generated ID.
// db.collection("users").add({
//     first: "Alan",
//     middle: "Mathison",
//     last: "Turing",
//     born: 1912
// })
// .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//     console.error("Error adding document: ", error);
// });