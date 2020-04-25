
function submitcreate()
{
    let fn = document.getElementById("fname").value;
    let ln = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    /*document.getElementById("fnametitle").innerHTML ="First name: ";
    document.getElementById("lnametitle").innerHTML = "Last name:";
    document.getElementById("emailtitle").innerHTML = "Email:";
    document.getElementById("phonetitle").innerHTML = "Phone:";
    document.getElementById("fnamedisp").innerHTML = fn;
    document.getElementById("lnamedisp").innerHTML = ln;
    document.getElementById("emaildisp").innerHTML = email;
    document.getElementById("phonedisp").innerHTML = phone;
    */
    window.location.href = "profile.html";
}
function submittask()
{
    let task = document.getElementById("task").value;
    let location = document.getElementById("location").value;
    /*document.getElementById("tasktitle").innerHTML ="Task: ";
    document.getElementById("locationtitle").innerHTML = "Location:";
    document.getElementById("taskdisp").innerHTML = task;
    document.getElementById("locationdisp").innerHTML = location;
    */
}

function submitsignin()
{
    let email = document.getElementById("eemail").value;
    let password = document.getElementById("epassword").value;
    window.location.href = "profile.html";

}

function createopen() {
    document.getElementById("landing").style.display = "none";
    document.getElementById("create").style.display = "block";
}

function signinopen() {
    document.getElementById("landing").style.display = "none";
    document.getElementById("sign-in").style.display = "block";
}
