var currentAdmin = protectAdminPage();

// Load owners and locations so they can be picked in the dropdowns
loadJSON("../data/owners.json", function (data) {
  owners = data;
  fillOwnerDropdown();
});

loadJSON("../data/locations.json", function (data) {
  locations = data;
  fillLocationDropdown();
});

loadJSON("../data/parcels.json", function (data) {
  parcels = data;
  renderParcels();
});

function fillOwnerDropdown() {
  var select = document.getElementById("ownerSelect");
  for (var i = 0; i < owners.length; i++) {
    var option = document.createElement("option");
    option.value = owners[i].owner_id;
    option.textContent = owners[i].first_name + " " + owners[i].last_name;
    select.appendChild(option);
  }
}

function fillLocationDropdown() {
  var select = document.getElementById("locationSelect");
  for (var i = 0; i < locations.length; i++) {
    var option = document.createElement("option");
    option.value = locations[i].location_id;
    option.textContent = locations[i].district + ", " + locations[i].cell + ", Plot " + locations[i].plot_number;
    select.appendChild(option);
  }
}

// Finds an owner or location by its ID, used when displaying the table
function findOwnerName(ownerId) {
  for (var i = 0; i < owners.length; i++) {
    if (owners[i].owner_id === ownerId) {
      return owners[i].first_name + " " + owners[i].last_name;
    }
  }
  return "Unknown";
}

function findLocationLabel(locationId) {
  for (var i = 0; i < locations.length; i++) {
    if (locations[i].location_id === locationId) {
      return locations[i].district + ", " + locations[i].cell;
    }
  }
  return "Unknown";
}

function renderParcels() {
  var tbody = document.getElementById("parcelsTableBody");
  var html = "";

  for (var i = 0; i < parcels.length; i++) {
    var parcel = parcels[i];
    html += "<tr>";
    html += "<td>" + parcel.parcel_id + "</td>";
    html += "<td>" + findOwnerName(parcel.owner_id) + "</td>";
    html += "<td>" + findLocationLabel(parcel.location_id) + "</td>";
    html += "<td>" + parcel.land_type + "</td>";
    html += "<td>" + parcel.area_sqm + "</td>";
    html += "<td>" + parcel.value + "</td>";
    html += "<td>" + parcel.reg_date + "</td>";
    html += "<td><button class=\"delete-btn\" onclick=\"deleteParcel('" + parcel.parcel_id + "')\">Delete</button></td>";
    html += "</tr>";
  }

  tbody.innerHTML = html;
}

function deleteParcel(parcelId) {
  for (var i = 0; i < parcels.length; i++) {
    if (parcels[i].parcel_id === parcelId) {
      parcels.splice(i, 1);
      break;
    }
  }
  renderParcels();
}

document.getElementById("addParcelForm").addEventListener("submit", function (e) {
  e.preventDefault();

  var newParcel = {
    parcel_id: generateId("PARCEL"),
    owner_id: document.getElementById("ownerSelect").value,
    location_id: document.getElementById("locationSelect").value,
    admin_id: currentAdmin.adminId,
    reg_date: getTodayDate(),
    value: document.getElementById("value").value,
    area_sqm: document.getElementById("areaSqm").value,
    land_type: document.getElementById("landType").value,
    title_deed: document.getElementById("titleDeed").value.trim(),
    remarks: document.getElementById("remarks").value.trim()
  };

  parcels.push(newParcel);
  renderParcels();
  document.getElementById("addParcelForm").reset();
});
