class Task{
	
	constructor(taskName = "", taskCreatorUsername = "", taskType = "", taskDescription = "", taskUrgency = 0, taskLongitude = -1, taskLatitude = -1){
		this.taskName = taskName;
		this.taskCreatorUsername = taskCreatorUsername;
		this.taskType = taskType;			//Task types are "Volunteering", "Food & Water", and "Lending"
		this.taskDescription = taskDescription;
		this.taskUrgency = taskUrgency;		//Task urgency is an integer from 1-5
		this.taskLongitude = taskLongitude;
		this.taskLatitude = taskLatitude;
	}
}