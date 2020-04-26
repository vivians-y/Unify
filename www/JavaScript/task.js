const taskTypes = ["shop", "lift", "stuff"];

class Task{
	constructor(taskName = "", taskCreatorUsername = "", taskType = "", taskDescription = "", taskUrgency = 0, taskLongitude = -1, taskLatitude = -1, timestamp = 0, uuid = ""){
		this.taskName = taskName;
		this.taskCreatorUsername = taskCreatorUsername;
		this.taskType = taskType;			//Task types are "Volunteering", "Food & Water", and "Lending"
		this.taskDescription = taskDescription;
		this.taskUrgency = taskUrgency;		//Task urgency is an integer from 1-5
		this.taskLongitude = taskLongitude;
		this.taskLatitude = taskLatitude;
		this.timestamp = timestamp; //Timestamp is an integer in the form "Year + Month + Day + Military time + Second", so 4/25/2020 at 8:05:10 AM would be 20200425080010
		this.uuid = uuid;
	}
}