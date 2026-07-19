// Load the list of admin accounts using AJAX
loadJSON("../data/admins.json", function (data) {
  admins = data;
});

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  var username = document.getElementById("username").value.trim();
  var password = document.getElementById("password").value;

  // Look for a matching admin account
  // Note: comparing plain text password here since we have no backend
  // to hash/verify passwords securely. Not meant for real-world use.
  var foundAdmin = null;
  for (var i = 0; i < admins.length; i++) {
    if (admins[i].user_name === username && admins[i].password_hash === password) {
      foundAdmin = admins[i];
    }
  }

  var errorBox = document.getElementById("loginError");

  if (foundAdmin === null) {
    errorBox.textContent = "Invalid username or password.";
  } else {
    // Pass the admin's info to the dashboard page through the URL
    window.location.href = "dashboard.html?username=" + foundAdmin.user_name + "&role=" + foundAdmin.role + "&admin_id=" + foundAdmin.admin_id;
  }
});
