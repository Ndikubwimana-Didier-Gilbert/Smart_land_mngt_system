var currentAdmin = protectAdminPage();

loadJSON("../data/owners.json", function (data) {
  owners = data;
  renderOwners();
});

function renderOwners() {
  var tbody = document.getElementById("ownersTableBody");
  var html = "";

  for (var i = 0; i < owners.length; i++) {
    var fullName = owners[i].first_name + " " + owners[i].last_name;
    html += "<tr>";
    html += "<td>" + owners[i].owner_id + "</td>";
    html += "<td>" + fullName + "</td>";
    html += "<td>" + owners[i].email + "</td>";
    html += "<td>" + owners[i].phone + "</td>";
    html += "<td>" + owners[i].national_id_or_passport + "</td>";
    html += "<td><button class=\"delete-btn\" onclick=\"deleteOwner('" + owners[i].owner_id + "')\">Delete</button></td>";
    html += "</tr>";
  }

  tbody.innerHTML = html;
}

function deleteOwner(ownerId) {
  for (var i = 0; i < owners.length; i++) {
    if (owners[i].owner_id === ownerId) {
      owners.splice(i, 1);
      break;
    }
  }
  renderOwners();
}

document.getElementById("addOwnerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  var newOwner = {
    owner_id: generateId("OWN"),
    first_name: document.getElementById("newFirstName").value.trim(),
    last_name: document.getElementById("newLastName").value.trim(),
    email: document.getElementById("newEmail").value.trim(),
    phone: document.getElementById("newPhone").value.trim(),
    national_id_or_passport: document.getElementById("newNationalId").value.trim()
  };

  owners.push(newOwner);
  renderOwners();
  document.getElementById("addOwnerForm").reset();
});
