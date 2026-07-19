var currentAdmin = protectAdminPage();

// Load data to calculate quick stats
loadJSON("../data/parcels.json", function (data) {
  parcels = data;
  document.getElementById("totalParcels").textContent = parcels.length;
});

loadJSON("../data/owners.json", function (data) {
  owners = data;
  document.getElementById("totalOwners").textContent = owners.length;
});

loadJSON("../data/applications.json", function (data) {
  applications = data;

  var pendingCount = 0;
  var approvedCount = 0;

  for (var i = 0; i < applications.length; i++) {
    var status = applications[i].status;
    if (status === "submitted" || status === "under_review") {
      pendingCount = pendingCount + 1;
    }
    if (status === "approved") {
      approvedCount = approvedCount + 1;
    }
  }

  document.getElementById("pendingApplications").textContent = pendingCount;
  document.getElementById("approvedApplications").textContent = approvedCount;
});
