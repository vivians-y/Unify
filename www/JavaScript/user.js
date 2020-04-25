class User{

	constructor(firstName = "",lastName = "",username = "",passw = "", email = "", phoneNumber = "", createdTasks = [], uuid = "", karma = 0){
        this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.passw = passw;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.createdTasks = createdTasks;
		this.karma = karma;
		this.uuid = uuid;
    }
}