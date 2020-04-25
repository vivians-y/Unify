var userList = [];
var taskList = [];

function getUserData(){
	
}

function getTaskData(){
	
}

function filterTasks(filterType){ //Filter types are "VolunteeringOnly", "Food&WaterOnly", "LendingOnly", "UrgencyAtLeast2", "UrgencyAtLeast3", "UrgencyAtLeast4"
	
	//getAllTasks(); //Refreshes tasks
	
	for(i=0; i < taskList.length; i++){ //Removes tasks that don't fit criteria
		if(filterType == "VolunteeringOnly"){
			if(taskList[i].taskType != "Volunteering"){
				taskList.splice(i);
			}
		}

		else if (filterType == "Food&WaterOnly"){
			if(taskList[i].taskType != "Food & Water"){
				taskList.splice(i);
			}
		}

		else if (filterType == "LendingOnly"){
			if(taskList[i].taskType != "Lending"){
				taskList.splice(i);
			}
		}
	}
}

