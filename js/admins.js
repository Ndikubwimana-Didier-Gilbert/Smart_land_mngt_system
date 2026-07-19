var currentAdmin = protectAdminPage();

loadJSON("../data/admins.json", function (data) {
  admins = data;
  renderAdmins();
});

function renderAdmins() {
  var tbody = document.getElementById("adminsTableBody");
  var html = "";

  for (var i = 0; i < admins.length; i++) {
    html += "<tr>";
    html += "<td>" + admins[i].admin_id + "</td>";
    html += "<td>" + admins[i].user_name + "</td>";
    html += "<td>" + admins[i].role + "</td>";
    html += "<td><button class=\"delete-btn\" onclick=\"deleteAdmin('" + admins[i].admin_id + "')\">Delete</button></td>";
    html += "</tr>";
  }

  tbody.innerHTML = html;
}

function deleteAdmin(adminId) {
  for (var i = 0; i < admins.length; i++) {
    if (admins[i].admin_id === adminId) {
      admins.splice(i, 1);
      break;
    }
  }
  renderAdmins();
}

document.getElementById("addAdminForm").addEventListener("submit", function (e) {
  e.preventDefault();

  var newAdmin = {
    admin_id: generateId("ADM"),
    user_name: document.getElementById("newUsername").value.trim(),
    password_hash: document.getElementById("newPassword").value,
    role: document.getElementById("newRole").value
  };

  admins.push(newAdmin);
  renderAdmins();
  document.getElementById("addAdminForm").reset();
});
