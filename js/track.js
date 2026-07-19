// Load applications and parcels using AJAX
loadJSON("data/applications.json", function (data) {
  applications = data;
});

loadJSON("data/parcels.json", function (data) {
  parcels = data;
});

document.getElementById("trackForm").addEventListener("submit", function (e) {
  e.preventDefault();

  var appId = document.getElementById("appIdInput").value.trim();
  var resultBox = document.getElementById("resultBox");

  // Look for a matching application
  var foundApplication = null;
  for (var i = 0; i < applications.length; i++) {
    if (applications[i].app_id.toLowerCase() === appId.toLowerCase()) {
      foundApplication = applications[i];
    }
  }

  // Nothing matched
  if (foundApplication === null) {
    resultBox.style.display = "block";
    resultBox.innerHTML = "<p>No application found with that ID. Please check and try again.</p>";
    return;
  }

  // Find the parcel linked to this application
  var foundParcel = null;
  for (var j = 0; j < parcels.length; j++) {
    if (parcels[j].parcel_id === foundApplication.parcel_id) {
      foundParcel = parcels[j];
    }
  }

  // Build the status badge class based on the status value
  var statusClass = "status-badge status-" + foundApplication.status;
  var statusLabel = foundApplication.status.replace("_", " ");

  var html = "";
  html += "<h2>Application " + foundApplication.app_id + "</h2>";
  html += "<p>Status: <span class=\"" + statusClass + "\">" + statusLabel + "</span></p>";
  html += "<p>Submitted on: " + foundApplication.submitted_date + "</p>";

  if (foundParcel !== null) {
    html += "<p>Location: " + foundParcel.district + ", " + foundParcel.cell + ", Plot " + foundParcel.plot_number + "</p>";
    html += "<p>Land type: " + foundParcel.land_type + "</p>";
  }

  resultBox.style.display = "block";
  resultBox.innerHTML = html;
});
