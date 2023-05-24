 var People = [
	{
		username: "shawn",
		password: "password"
	},
	{
		username: "michelle",
		password: "password22"
	}
]

function getInfo() {
	var username = document.getElementById('username').value
	var password = document.getElementById('password').value

	for(var i = 0; i < People.length; i++) {
		if(username == People[i].username && password == People[i].password) {
            alert("You are logged in as " + username)
            window.location.href = 'http://www.google.com';
			return
            
		}
	}
	alert("Incorrect username or password")
}

function showHideMenu() {
	var menu = document.getElementById("menu");
	var menuBtn = document.getElementById("menuBtn");
	if (menu.style.display === "block") {
	  menu.style.display = "none" //hide menu

	} else {
	  menu.style.display = "block"; //show menu
	}
  }

//Greet visitor by name with random message
function greetUser(){
	var name = prompt("What is your name?");
	var message = "Hello " + name;
	document.getElementById("greeting").innerHTML = message;
  }