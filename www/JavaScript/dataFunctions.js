function findUserByUsername(userList, username){ //Returns position in userList array
	for(i=0; i < userList.length; i++)
		if(userList[i].username == username)
			return i;
}


function filterTasks(taskList, userList, filterType){ //Filter types are "VolunteeringOnly", "Food&WaterOnly", "LendingOnly", "UrgencyAtLeast2", "UrgencyAtLeast3", "UrgencyAtLeast4", "KarmaAtLeast100", "Within1Mile" ,"Within5Miles", "Within10Miles", and "Within25Miles"
	
	//getAllTasks(); //Refreshes tasks
	
	for(i=0; i < taskList.length; i++){ //Loops through task list and removes tasks that don't fit criteria
		if (filterType == "VolunteeringOnly")
			if(taskList[i].taskType != "Volunteering")
				taskList.splice(i);

		else if (filterType == "Food&WaterOnly")
			if(taskList[i].taskType != "Food & Water")
				taskList.splice(i);

		else if (filterType == "LendingOnly")
			if(taskList[i].taskType != "Lending")
				taskList.splice(i);

		else if (filterType == "UrgencyAtLeast2")
			if(taskList[i].taskUrgency < 2)
				taskList.splice(i);

		else if (filterType == "UrgencyAtLeast3")
			if(taskList[i].taskUrgency < 3)
				taskList.splice(i);

		else if (filterType == "UrgencyAtLeast4")
			if(taskList[i].taskUrgency < 4)
				taskList.splice(i);

		else if (filterType == "KarmaAtLeast100")
			if(userList[findUserByUsername(userList,taskList[i].taskCreatorUsername)].karma < 100)
				taskList.splice(i);

		else if (filterType == "Within1Mile")
			if(getDistance(localLongitude,localLatitude,taskList[i].taskLongitude,taskList[i].taskLatitude) > 1)
				taskList.splice(i);

		else if (filterType == "Within5Miles")
			if(getDistance(localLongitude,localLatitude,taskList[i].taskLongitude,taskList[i].taskLatitude) > 5)
				taskList.splice(i);

		else if (filterType == "Within10Miles")
			if(getDistance(localLongitude,localLatitude,taskList[i].taskLongitude,taskList[i].taskLatitude) > 10)
				taskList.splice(i);
		
		else if (filterType == "Within25Miles")
			if(getDistance(localLongitude,localLatitude,taskList[i].taskLongitude,taskList[i].taskLatitude) > 25)
				taskList.splice(i);

		else
			console.log("Invalid filtering type");
	}

}

function sortTasks(taskList, sortType) {
	let sorted = false;
	if(taskList.length == 1)
		return;

	while(!sorted){	//Does a bubble sort with the type of value being compared depending on sortType
		for(i = 1; i < taskList.length; i++){
			let comparisonValue1;
			let comparisonValue2;
			let currUser = JSON.parse(sessionStorage.getItem("currentUser"));

			sorted = true;

			if(sortType == "Recent"){
				comparisonValue2 = taskList[i].timestamp;
				comparisonValue1 = taskList[i-1].timestamp;
			}
			else if(sortType == "Urgency"){
				comparisonValue2 = taskList[i].taskUrgency;
				comparisonValue1 = taskList[i-1].taskUrgency;
			}
			else if(sortType == "Closest"){
				comparisonValue2 = getDistance(currUser.longitude,currUser.latitude,taskList[i].taskLongitude,taskList[i].taskLatitude);
				comparisonValue1 = getDistance(currUser.longitude,currUser.latitude,taskList[i-1].taskLongitude,taskList[i-1].taskLatitude);
			}
			if((sortType == "Urgency" && comparisonValue2 > comparisonValue1) || ((sortType == "Recent" || sortType == "Closest") && comparisonValue2 < comparisonValue1)){
				let temp = taskList[i];
				taskList[i] = taskList[i-1];
				taskList[i-1] = temp;
				sorted = false;
			}
		}
	}
	refreshTaskListUI(1);
}

function refreshTaskListUI(pageNum){	//Changes the UI of the task list UI depending on page number
	// update task 0
	document.getElementById("task0").innerText = `Username: ${currUser.username}`;
	// update task 1
	document.getElementById("task1").innerText = `Karma: ${currUser.karma}`;
	// update task 2
	document.getElementById("task2").innerText = `Name: ${currUser.firstName} ${currUser.lastName}`;
	// update task 3
	document.getElementById("task3").innerText = `Email: ${currUser.email}`;
	// update task 4

	// update task 5

	// update task 6
	
	// update task 7
	
	// update task 8
	
	// update task 9
	

}

