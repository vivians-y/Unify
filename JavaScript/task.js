class task{
	var taskName;
	var taskCreatorUsername;
	var taskType;			//Task types are volunteering, food & water, and lending
	var taskDescription;
	var taskUrgency;		//Task urgency is an integer from 1-5
	var taskLocation;
	
	constructor(taskName = "", taskCreatorUsername = "", taskType = "", taskDescription = "", taskUrgency = 0, taskLocation = ""){
		this.taskName = taskName;
		this.taskCreatorUsername = taskCreatorUsername;
		this.taskType = taskType;
		this.taskDescription = taskDescription;
		this.taskUrgency = taskUrgency;
		this.taskLocation = taskLocation;
	}
}