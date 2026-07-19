// Load stats using AJAX (XMLHttpRequest) and show them on the page
function loadStats() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "data/stats.json", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      document.getElementById("parcelCount").textContent = data.parcelsRegistered;
      document.getElementById("districtCount").textContent = data.districtsCovered;
      document.getElementById("applicationCount").textContent = data.applicationsProcessed;
    }
  };

  xhr.send();
}

loadStats();
