// Create the tile layer that will be the background of our map.
var basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create the map

var map = L.map("map",{
    center: [44.966667, -103.766667],
    zoom: 4,
    // layers: [
    //     layers.shakes
    // ]
});

// Add our tile layer to the map.
basemap.addTo(map);


// // // Create a legend to display information about our map.
// var leg = L.control({
//   position: "bottomright"
// });


// // Add the info legend to the map.
// leg.addTo(map);

// Our target url
url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"

// Perform an API call to earthquake data
d3.json(url).then(function(response) {

    console.log(response);
    let features = response.features
    console.log(features);

    for (var i = 0; i < features.length; i++) {
        var location = features[i].geometry;
        var depth = location.coordinates[2]
        var magnitude = features[i].properties.mag
        var info = features[i].properties.place

    // Conditionals for earthquake depth marker
    var color = "";
    if (depth > -10) {
      color = "yellow";
    }
    else if (depth > 10) {
      color = "green";
    }
    else if (depth > 30) {
      color = "orange";
    }
    else if (depth > 50) {
        color = "green";
      }
    else if (depth > 70) {
        color = "green";
      }
    else {
      color = "red";
    }
  
    // Add circles to the map.
    L.circle([location.coordinates[1], location.coordinates[0]], {
      fillOpacity: 0.9,
      color: "white",
      fillColor: color,
      // Adjust the radius.
      radius: Math.sqrt(magnitude) * 50000
    }).bindPopup(`<h1>${info}</h1> <hr> <h3>Yikes</h3>`).addTo(map);
  }
  });
  