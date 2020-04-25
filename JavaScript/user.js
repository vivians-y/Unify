class User{
	var firstName;
	var lastName;
	var username;
	var passw;
	var karma;
	
    constructor(){
        this.firstName = "";
		this.lastName = "";
		this.username = "";
		this.passw = "";
		this.karma = 0;
    }
	
	constructor(firstName,lastName,username,passw){
        this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.passw = passw;
		this.karma = 0;
    }
}