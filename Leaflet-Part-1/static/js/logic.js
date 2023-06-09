// Create the tile layer that will be the background of our map.
var basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create the map

var map = L.map("map",{
    center: [44.966667, -103.766667],
    zoom: 5,
});

// Add our tile layer to the map.
basemap.addTo(map);

function getColor(d) {
    return d > 90  ? '#cc0000' :
           d > 70  ? '#ff3333' :
           d > 50   ? '#ff9933':
           d > 30   ? '#ffff33' :
           d > 10   ? '#99ff33' :
           '#33ff33';
}


// Our target url
url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

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

    // Add circles to the map.
    L.circle([location.coordinates[1], location.coordinates[0]], {
      fillOpacity: 0.99,
      color: "black",
      weight: 1,
      fillColor: getColor(depth),
      // Adjust the radius.
      radius: Math.sqrt(magnitude) * 40000
    }).bindPopup(`<h2>${info}</h2> <hr> <h3>Magnitude:${magnitude}</h3><h3>Depth:${depth}</h3>`).addTo(map);
  }

  });

//Adding a legend to explain the color coding

  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {
  
      var div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 10, 30, 50, 70, 90],
          labels = [];
  
      // loop through our depth intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
  
      return div;
  };
  
  legend.addTo(map);
  