// Load all existing data from the JSON files using AJAX
loadJSON("data/owners.json", function (data) {
  owners = data;
});

loadJSON("data/locations.json", function (data) {
  locations = data;
});

loadJSON("data/parcels.json", function (data) {
  parcels = data;
});

loadJSON("data/applications.json", function (data) {
  applications = data;
});

document.getElementById("applicationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get owner details from the form
  var firstName = document.getElementById("firstName").value.trim();
  var lastName = document.getElementById("lastName").value.trim();
  var email = document.getElementById("email").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var nationalId = document.getElementById("nationalId").value.trim();

  // Get location details
  var district = document.getElementById("district").value.trim();
  var cell = document.getElementById("cell").value.trim();
  var plotNumber = document.getElementById("plotNumber").value.trim();

  // Get parcel details
  var areaSqm = document.getElementById("areaSqm").value;
  var value = document.getElementById("value").value;
  var landType = document.getElementById("landType").value;
  var titleDeed = document.getElementById("titleDeed").value.trim();
  var remarks = document.getElementById("remarks").value.trim();

  // Check if this owner already exists (by national ID)
  var owner = null;
  for (var i = 0; i < owners.length; i++) {
    if (owners[i].national_id_or_passport === nationalId) {
      owner = owners[i];
    }
  }

  // If owner does not exist yet, create a new one and add to the array
  if (owner === null) {
    owner = {
      owner_id: generateId("OWN"),
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      national_id_or_passport: nationalId
    };
    owners.push(owner);
  }

  // Create the location
  var location = {
    location_id: generateId("LOC"),
    district: district,
    cell: cell,
    plot_number: plotNumber
  };
  locations.push(location);

  // Create the parcel
  var parcel = {
    parcel_id: generateId("PARCEL"),
    owner_id: owner.owner_id,
    location_id: location.location_id,
    admin_id: null,
    reg_date: getTodayDate(),
    value: value,
    area_sqm: areaSqm,
    land_type: landType,
    title_deed: titleDeed,
    remarks: remarks
  };
  parcels.push(parcel);

  // Create the application
  var application = {
    app_id: generateId("APP"),
    parcel_id: parcel.parcel_id,
    processed_by: null,
    status: "submitted",
    submitted_date: getTodayDate()
  };
  applications.push(application);

  // Hide the form and show the confirmation message
  document.getElementById("applicationForm").style.display = "none";
  document.getElementById("confirmationBox").style.display = "block";
  document.getElementById("generatedAppId").textContent = application.app_id;
});
