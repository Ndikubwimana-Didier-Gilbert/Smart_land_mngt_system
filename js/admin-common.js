// Shared logic for every admin page (except login.html itself).
// Since we are not using localStorage/sessionStorage, the logged-in
// admin's info travels through the URL query string. This function:
//   1. Sends the user back to login if that info is missing
//   2. Shows the "Logged in as ..." message if the page has one
//   3. Copies the query string onto every admin nav link, so moving
//      from page to page keeps the "session" going

function protectAdminPage() {
  var username = getQueryParam("username");
  var role = getQueryParam("role");
  var adminId = getQueryParam("admin_id");

  if (username === null) {
    window.location.href = "login.html";
    return null;
  }

  var welcomeEl = document.getElementById("welcomeMessage");
  if (welcomeEl !== null) {
    welcomeEl.textContent = "Logged in as " + username + " (" + role + ")";
  }

  var navLinks = document.querySelectorAll(".admin-nav__link, .navbar__brand");
  for (var i = 0; i < navLinks.length; i++) {
    var href = navLinks[i].getAttribute("href");
    navLinks[i].setAttribute("href", href + window.location.search);
  }

  return { username: username, role: role, adminId: adminId };
}
