// parse google sheet data//
var people = [];
var usersSpreadsheet = "https://docs.google.com/spreadsheets/d/1GpHl4VDCWP-8fvAi2W66jry6NzL1ZlxLufS_0BkSbMA/edit#gid=0"

// parse google sheet data
function init() {
	Tabletop.init({
		key: usersSpreadsheet,
		callback: function(data, tabletop) {
			console.log(data)
			people = data;
		},
		simpleSheet: true
	})
}


console.log(people)


function getInfo() {
	var username = document.getElementById('username').value
	var password = document.getElementById('password').value

	for(var i = 0; i < people.length; i++) {
		if(username == people[i].username && password == people[i].password) {
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