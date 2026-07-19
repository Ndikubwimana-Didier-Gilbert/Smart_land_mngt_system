var currentAdmin = protectAdminPage();

loadJSON("../data/parcels.json", function (data) {
  parcels = data;
  renderApplications();
});

loadJSON("../data/applications.json", function (data) {
  applications = data;
  renderApplications();
});

function findParcelLabel(parcelId) {
  for (var i = 0; i < parcels.length; i++) {
    if (parcels[i].parcel_id === parcelId) {
      return parcels[i].land_type + " parcel (" + parcels[i].parcel_id + ")";
    }
  }
  return parcelId;
}

function renderApplications() {
  // Wait until both applications and parcels have loaded
  if (applications.length === 0) {
    return;
  }

  var tbody = document.getElementById("applicationsTableBody");
  var html = "";

  for (var i = 0; i < applications.length; i++) {
    var app = applications[i];
    var processedBy = app.processed_by === null ? "Not yet processed" : app.processed_by;

    html += "<tr>";
    html += "<td>" + app.app_id + "</td>";
    html += "<td>" + findParcelLabel(app.parcel_id) + "</td>";
    html += "<td>" + app.submitted_date + "</td>";
    html += "<td>" + processedBy + "</td>";
    html += "<td>";
    html += "<select class=\"status-select\" onchange=\"updateStatus('" + app.app_id + "', this.value)\">";
    html += "<option value=\"submitted\"" + (app.status === "submitted" ? " selected" : "") + ">Submitted</option>";
    html += "<option value=\"under_review\"" + (app.status === "under_review" ? " selected" : "") + ">Under review</option>";
    html += "<option value=\"approved\"" + (app.status === "approved" ? " selected" : "") + ">Approved</option>";
    html += "<option value=\"rejected\"" + (app.status === "rejected" ? " selected" : "") + ">Rejected</option>";
    html += "</select>";
    html += "</td>";
    html += "</tr>";
  }

  tbody.innerHTML = html;
}

function updateStatus(appId, newStatus) {
  for (var i = 0; i < applications.length; i++) {
    if (applications[i].app_id === appId) {
      applications[i].status = newStatus;
      applications[i].processed_by = currentAdmin.username;
    }
  }
  renderApplications();
}
