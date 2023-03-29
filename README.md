# leaflet-challenge

# Description

This is a map of the past month's seismological activity as collected by the United States Geological Survey and shared in a GeoJSON format here: https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

The map reads in data from the endpoint for all earthquakes in the past 30 days. Each feature represents an earthquake. The feature's coordinates are used to plot circle markers on the map. 

The magnitude of the earthquake determines the size of the circle. A function is defined to make the sizes appear more clearly.

The depth of the earthquake determines the color of the circle. 

The map features a legend that explains the color code.

# Acknowledgements 

Thanks to the teachers and TAs for their help .The Leaflet documentation was also incredibly helpful, especially this example for the color scale and legend: https://leafletjs.com/examples/choropleth/
