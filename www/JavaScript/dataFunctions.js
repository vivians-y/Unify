function findUserByUsername(userList, username){ //Returns position in userList array
	for(let i=0; i < userList.length; i++)
		if(userList[i].username == username)
			return i;
}


function filterTasks(taskList, userList, filterType, position){ //Filter types are "VolunteeringOnly", "Food&WaterOnly", "LendingOnly", "UrgencyAtLeast2", "UrgencyAtLeast3", "UrgencyAtLeast4", "KarmaAtLeast100", "Within1Mile" ,"Within5Miles", "Within10Miles", and "Within25Miles"
	console.log(`Top of filterTasks: taskList: ${taskList.toString()}\nuserList: ${userList.toString()}\nfilterType: ${filterType}, position: ${position.toString()}`);

	let newArr = [];

    for(let i=0; i < taskList.length; i++){ //Loops through task list and removes tasks that don't fit criteria
		if (filterType == "VolunteeringOnly") {
            if (taskList[i].taskType != "Volunteering") {
                continue;
            }
        }

		else if (filterType == "Food&WaterOnly") {
            if (taskList[i].taskType != "Food & Water") {
                continue;
            }
        }

		else if (filterType == "LendingOnly") {
            if (taskList[i].taskType != "Lending") {
                continue;
            }
        }

		else if (filterType == "UrgencyAtLeast2") {
            if (taskList[i].taskUrgency < 2) {
                continue;
            }
        }

		else if (filterType == "UrgencyAtLeast3") {
            if (taskList[i].taskUrgency < 3) {
                continue;
            }
        }

		else if (filterType == "UrgencyAtLeast4") {
            if (taskList[i].taskUrgency < 4) {
                continue;
            }
        }

        else if (filterType == "UrgencyAtLeast5") {
            if (taskList[i].taskUrgency < 5) {
                continue;
            }
        }

        else if (filterType == "KarmaAtLeast5"){
            if(userList[findUserByUsername(userList,taskList[i].taskCreatorUsername)].karma < 5) {
                continue;
            }
        }

        else if (filterType == "KarmaAtLeast10") {
            if (userList[findUserByUsername(userList, taskList[i].taskCreatorUsername)].karma < 10) {
                continue;
            }
        }

        else if (filterType == "KarmaAtLeast50") {
            if (userList[findUserByUsername(userList, taskList[i].taskCreatorUsername)].karma < 50) {
                continue;
            }
        }

        else if (filterType == "KarmaAtLeast100") {
            if (userList[findUserByUsername(userList, taskList[i].taskCreatorUsername)].karma < 100) {
                continue;
            }
        }

        // TODO: make me work
        if(position != null && position != -1 && false) {
            if (filterType == "Within1Mile") {
                if (getDistance(position.lat, position.lng, taskList[i].taskLatitude, taskList[i].taskLongitude) > 1) {
                    continue;
                }
            }

            else if (filterType == "Within5Miles") {
                if (getDistance(position.lat, position.lng, taskList[i].taskLatitude, taskList[i].taskLongitude) > 5) {
                    continue;
                }
            }

            else if (filterType == "Within10Miles") {
                if (getDistance(position.lat, position.lng, taskList[i].taskLatitude, taskList[i].taskLongitude) > 10) {
                    continue;
                }
            }

            else if (filterType == "Within25Miles") {
                if (getDistance(position.lat, position.lng, taskList[i].taskLatitude, taskList[i].taskLongitude) > 25) {
                    continue;
                }
            }
        }
        newArr.push(taskList[i]);
	}
	return newArr;
}

function sortTasks(taskList, sortType, currPos) {
	let sorted = false;
	if(taskList.length == 1)
		return;

	while(!sorted){	//Does a bubble sort with the type of value being compared depending on sortType
        sorted = true;
		for(let i = 1; i < taskList.length; i++){
			let comparisonValue1;
			let comparisonValue2;

			if(sortType == "Recent"){
				comparisonValue2 = taskList[i].timestamp;
				comparisonValue1 = taskList[i-1].timestamp;
			}
			else if(sortType == "Urgency"){
				comparisonValue2 = taskList[i].taskUrgency;
				comparisonValue1 = taskList[i-1].taskUrgency;
			}
			else if(sortType == "Closest"){
				comparisonValue2 = getDistance(currPos.lat,currPos.lng,taskList[i].taskLatitude,taskList[i].taskLongitude);
				comparisonValue1 = getDistance(currPos.lat,currPos.lng,taskList[i-1].taskLatitude,taskList[i-1].taskLongitude);
			}

			if(comparisonValue2 > comparisonValue1){
				let temp = taskList[i];
				taskList[i] = taskList[i-1];
				taskList[i-1] = temp;
				sorted = false;
			}
		}
	}
	return taskList;
	// refreshTaskListUI(1);
}

