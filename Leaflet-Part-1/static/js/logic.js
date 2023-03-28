// Create the tile layer that will be the background of our map.
var basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create a layer for our markers

// var layers = {
//     shakes: new L.LayerGroup()
// };

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

// //create an overlays object

// var overlay = {
//     "Quakes": layers.shakes
// };

// // // Create a control for our layers, and add our overlays to it.
// L.control.layers(null, layers).addTo(map);

// // // Create a legend to display information about our map.
// var info = L.control({
//   position: "bottomright"
// });

// // When the layer control is added, insert a div with the class of "legend".
// info.onAdd = function() {
//     var div = L.DomUtil.create("div", "legend");
//     return div;
// };

// // Add the info legend to the map.
// info.addTo(map);


// var icons = {
//     trembler: L.ExtraMarkers.icon({
//     icon: "ion-settings",
//     iconColor: "white",
//     markerColor: "yellow",
//     shape: "star"
// })
// };

// Our target url
url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"

// Perform an API call to earthquake data
d3.json(url).then(function(response) {

    console.log(response);
    let features = response.features
    console.log(features);

    for (var i = 0; i < features.length; i++) {
        var location = features[i].geometry;
    
        if (location) {
          L.marker([location.coordinates[1], location.coordinates[0]]).addTo(map);
        }
      }

    // // Create a new marker with the appropriate icon and coordinates.
    // var newMarker = L.marker([coordinates], {
    //     icon: equake
    //   });

    //   // Add the new marker to the appropriate layer.
    //   newMarker.addTo(layers[layer]);

    //   // Bind a popup to the marker that will  display on being clicked. This will be rendered as HTML.
    //   newMarker.bindPopup("Wow");
    // };
  
  });
  
