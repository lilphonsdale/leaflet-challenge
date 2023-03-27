// Our target url
url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"

// // Take a look at the data in the console
// d3.json(url).then(function(data){
//     console.log(data);
// });

// Create the tile layer that will be the background of our map.
var basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create a layer for our markers

// var layer = new L.LayerGroup()

// Create the map

var map = L.map("map",{
    center: [44.966667, -103.766667],
    zoom: 4,
    // layers: layer
});

// Add our tile layer to the map.
basemap.addTo(map);

// var overlay = {"Quakes": layers.layer};

// // Create a control for our layers, and add our overlays to it.
// L.control.layers(null, layer).addTo(map);

// // Create a legend to display information about our map.
// var info = L.control({
//   position: "bottomright"
// });

// Perform an API call to earthquake data
d3.json(url).then(function(response) {

    console.log(response);

    let latlon = response.geometry.coordinates[1,0]
    console.log(latlon);
  
    var quakes = [];
  
    for (var i = 0; i < response.length; i++) {
      var location = response[i].location;
  
      if (location) {
        heatArray.push([location.coordinates[1], location.coordinates[0]]);
      }
    }
  
    var earthquakes = L.heatLayer(quakes, {
      radius: 20,
      blur: 35
    }).addTo(myMap);
  
  });
  
