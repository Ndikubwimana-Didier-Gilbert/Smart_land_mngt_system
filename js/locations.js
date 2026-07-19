var currentAdmin = protectAdminPage();

loadJSON("../data/locations.json", function (data) {
  locations = data;
  renderLocations();
});

function renderLocations() {
  var tbody = document.getElementById("locationsTableBody");
  var html = "";

  for (var i = 0; i < locations.length; i++) {
    html += "<tr>";
    html += "<td>" + locations[i].location_id + "</td>";
    html += "<td>" + locations[i].district + "</td>";
    html += "<td>" + locations[i].cell + "</td>";
    html += "<td>" + locations[i].plot_number + "</td>";
    html += "<td><button class=\"delete-btn\" onclick=\"deleteLocation('" + locations[i].location_id + "')\">Delete</button></td>";
    html += "</tr>";
  }

  tbody.innerHTML = html;
}

function deleteLocation(locationId) {
  for (var i = 0; i < locations.length; i++) {
    if (locations[i].location_id === locationId) {
      locations.splice(i, 1);
      break;
    }
  }
  renderLocations();
}

document.getElementById("addLocationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  var district = document.getElementById("newDistrict").value.trim();
  var cell = document.getElementById("newCell").value.trim();
  var plotNumber = document.getElementById("newPlotNumber").value.trim();

  var newLocation = {
    location_id: generateId("LOC"),
    district: district,
    cell: cell,
    plot_number: plotNumber
  };

  locations.push(newLocation);
  renderLocations();
  document.getElementById("addLocationForm").reset();
});
