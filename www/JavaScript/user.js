class User{

	constructor(firstName = "",lastName = "",username = "",passw = "", email = "", phoneNumber = "", longitude = -1, latitude = -1, createdTasks = [], uuid = "", karma = 0){
        this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.passw = passw;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.longitude = longitude;
		this.latitude = latitude;
		this.createdTasks = createdTasks;
		this.karma = karma;
		this.uuid = uuid;
    }
}