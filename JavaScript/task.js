class task{
	
	constructor(taskName = "", taskCreatorUsername = "", taskType = "", taskDescription = "", taskUrgency = 0, taskLocation = ""){
		this.taskName = taskName;
		this.taskCreatorUsername = taskCreatorUsername;
		this.taskType = taskType;			//Task types are volunteering, food & water, and lending
		this.taskDescription = taskDescription;
		this.taskUrgency = taskUrgency;		//Task urgency is an integer from 1-5
		this.taskLocation = taskLocation;
	}
}