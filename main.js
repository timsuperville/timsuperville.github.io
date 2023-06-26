const CLIENT_ID = '95548705566-tuum5vgsj05qqo13o01mfq4tm5jlks9f.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAUFzFV0f78lIIceD5Cr4KyLE9We8hMdqY';
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';
let tokenClient;
let gapiInited = false;
let gisInited = false;
async function initializeGapiClient() {
	await gapi.client.init({
	  	apiKey: API_KEY,
		discoveryDocs: [DISCOVERY_DOC],
	});
	gapiInited = true;
	maybeEnableButtons();
}

function gapiLoaded() {
	gapi.load('client', initializeGapiClient);
}
function gisLoaded() {
	tokenClient = google.accounts.oauth2.initTokenClient({
	  client_id: CLIENT_ID,
	  scope: SCOPES,
	  callback: '', // defined later
	});
	gisInited = true;
	maybeEnableButtons();
}
function maybeEnableButtons() {
	if (gapiInited && gisInited) {
	  document.getElementById('authorize_button').style.visibility = 'visible';
	}
}
function handleAuthClick() {
	tokenClient.callback = async (resp) => {
	  if (resp.error !== undefined) {
		throw (resp);
	  }
	  document.getElementById('signout_button').style.visibility = 'visible';
	  document.getElementById('authorize_button').innerText = 'Refresh';
	  await listMajors();
	};
	if (gapi.client.getToken() === null) {
		// Prompt the user to select a Google Account and ask for consent to share their data
		// when establishing a new session.
		tokenClient.requestAccessToken({prompt: 'consent'});
	  } else {
		// Skip display of account chooser and consent dialog for an existing session.
		tokenClient.requestAccessToken({prompt: ''});
	  }
}
function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
    	google.accounts.oauth2.revoke(token.access_token);
      	gapi.client.setToken('');
      	document.getElementById('content').innerText = '';
      	document.getElementById('authorize_button').innerText = 'Authorize';
      	document.getElementById('signout_button').style.visibility = 'hidden';
    }
}
async function listMajors() {
	let response;
  	try {
    // Fetch first 10 files
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1GpHl4VDCWP-8fvAi2W66jry6NzL1ZlxLufS_0BkSbMA',
      range: 'Class Data!A1:D',
    });
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    return;
  }
  const range = response.result;
  if (!range || !range.values || range.values.length == 0) {
    document.getElementById('content').innerText = 'No values found.';
    return;
  }
  // Flatten to string to display
  const output = range.values.reduce(
      (str, row) => `${str}${row[0]}, ${row[4]}\n`,
      'Name, Major:\n');
  document.getElementById('content').innerText = output;
}



console.log(tokenClient)


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