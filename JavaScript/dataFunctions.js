var userList = [];
var taskList = [];

function getUserData(){
	
}

function getTaskData(){
	
}

function filterTasks(filterType){ //Filter types are "VolunteeringOnly", "Food&WaterOnly", "LendingOnly", "UrgencyAtLeast2", "UrgencyAtLeast3", "UrgencyAtLeast4"
	
	getAllTasks(); //Refreshes tasks
	
	taskList.push(new Task("Help", "Ted", "Volunteering", "I'm dying", 5, "My House"));
	
	for(i=0; i < taskList.length; i++){ //Removes tasks that don't fit criteria
		if(filterType == "VolunteeringOnly"){
			console.log("Volunteering Only");
		}

		else if (filterType == "Food&WaterOnly"){
			console.log("Food & Water Only");
		}

		else if (filterType == "LendingOnly"){
			console.log("Lending Only");
		}
	}
}

