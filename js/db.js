// Plain JavaScript arrays act as our "database" for this session.
// Since there is no backend/database, these start empty (or get filled
// from a JSON file using AJAX) and just live in memory while the page is open.

var owners = [];
var locations = [];
var parcels = [];
var applications = [];
var admins = [];

// Generates a simple unique ID using the current time
function generateId(prefix) {
  return prefix + "-" + Date.now();
}

function getTodayDate() {
  var today = new Date();
  return today.toISOString().split("T")[0];
}

// Loads a JSON file using AJAX (XMLHttpRequest)
// url = path to the JSON file
// callback = function to run once the data has loaded
function loadJSON(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        callback(data);
      } else {
        console.log("Could not load " + url);
      }
    }
  };

  xhr.send();
}

// Reads a value from the page URL, e.g. dashboard.html?username=admin
// Used to pass the logged-in admin's info from page to page,
// since we are not using localStorage/sessionStorage in this project.
function getQueryParam(name) {
  var queryString = window.location.search.substring(1);
  var pairs = queryString.split("&");

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split("=");
    if (pair[0] === name) {
      return decodeURIComponent(pair[1]);
    }
  }
  return null;
}
