var userList = [];
var taskList = [];

function getUserData(){
	
}

function getTaskData(){
	
}

function findUserByUsername(username){ //Returns position in userList array
	for(i=0; i < userList.length; i++)
		if(userList[i].username == username)
			return i;
}


function filterTasks(filterType){ //Filter types are "VolunteeringOnly", "Food&WaterOnly", "LendingOnly", "UrgencyAtLeast2", "UrgencyAtLeast3", "UrgencyAtLeast4", "KarmaAtLeast100", "Within1Mile" ,"Within5Miles", "Within10Miles", and "Within25Miles"
	
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
			if(userList[findUserByUsername(taskList[i].taskCreatorUsername)].karma < 100)
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

