function thousandsSeparator(x) {
  if (x !== null) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
    return x;
  } else {
    return "";
  }
}

let map1 = L.map("map_rev_1", {
  fullScreenControl: true,
  zoomSnap: 1,
  minZoom: 5,
  attributionControl: true,
  maxBounds: [
    [50.0, -140.0],
    [20.0, -55.0],
  ],
}).setView([38, -97], 5);

map1.attributionControl.setPrefix(false);
map1.attributionControl.addAttribution(
  '<a href="some_link", class="your_class">USDA Rural Development Grant Awards, FY \'92</a>'
);

let map2 = L.map("map_rev_2", {
  fullScreenControl: true,
  zoomSnap: 1,
  minZoom: 5,
  maxBounds: [
    [50.0, -140.0],
    [20.0, -55.0],
  ],
}).setView([38, -97], 5);

map2.attributionControl.setPrefix(false);
map2.attributionControl.addAttribution(
  '<a href="some_link", class="your_class">USDA Rural Development Grant Awards, FY \'92</a>'
);

let layerTilesOSM_1 = new L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors</a>',
  }
);

let layerTilesOSM_2 = new L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors</a>',
  }
);

layerTilesOSM_1.addTo(map1);
layerTilesOSM_2.addTo(map2);

let scale1 = L.control.scale({
  metric: true,
  imperial: true,
  position: "bottomright",
});

let scale2 = L.control.scale({
  metric: true,
  imperial: true,
  position: "bottomright",
});

scale1.addTo(map1);
scale2.addTo(map2);

const fsControl1 = L.control.fullscreen();
const fsControl2 = L.control.fullscreen();

map1.addControl(fsControl1);
map2.addControl(fsControl2);

const homeButton1 = L.easyButton(
  '<span class="star" style="padding:0px;">&starf;</span>',

  function (btn, map) {
    map.setView([38, -97], 5);
  },
  "Default View"
).addTo(map1);

const homeButton2 = L.easyButton(
  '<span class="star" style="padding:0px;">&starf;</span>',

  function (btn, map) {
    map.setView([38, -97], 5);
  },
  "Default View"
).addTo(map2);

let popupStyle = {
  maxWidth: "300",
  className: "custom",
  closeButton: true,
};

function onEachMarker(feature, layer) {
  let popupContent =
    '<p class="popup-title">' +
    feature.properties.county +
    ", " +
    feature.properties.state +
    "</p>" +
    '<p class="popup-text">Rep: ' +
    feature.properties.reps +
    "</p>" +
    '<p class="popup-text">Grant Amount: $' +
    thousandsSeparator(feature.properties.grant_amount) +
    "</p>" +
    '<p class="popup-text">Obligation Date: ' +
    feature.properties.obligation_date +
    "</p>" +
    '<p class="popup-text">Program: ' +
    feature.properties.program +
    "</p>";
  layer.bindPopup(popupContent, popupStyle);
}

// rev001 - as individual circles
let layerPoints = L.geoJson(geojsonPoints, {
  onEachFeature: onEachMarker,
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
      color: "#ffffff",
      fillColor: "#e18f0c",
      fillOpacity: 0.8,
      opacity: 1,
      radius: 7,
      weight: 2,
    });
  },
}).addTo(map1);

// rev002 - as individual circles
let markerCluster = L.markerClusterGroup({
  showCoverageOnHover: false,
  singleMarkerMode: true,
});

let geoJsonLayer = L.geoJson(geojsonPoints, {
  onEachFeature: onEachMarker,
});
markerCluster.addLayer(geoJsonLayer);

map2.addLayer(markerCluster);

const logo1 = L.control({ position: "topright" });
logo1.onAdd = function (map) {
  let div = L.DomUtil.create("div", "logo");
  div.innerHTML = "<img src='./images/logo.png'/>";
  return div;
};

const logo2 = L.control({ position: "topright" });
logo2.onAdd = function (map) {
  let div = L.DomUtil.create("div", "logo");
  div.innerHTML = "<img src='./images/logo.png'/>";
  return div;
};

const title1 = L.control({ position: "bottomleft" });
title1.onAdd = function (map) {
  let div = L.DomUtil.create("div", "title");
  div.innerHTML = "<h2>USDA Rural Development Grant Awards, FY '92</h2>";
  return div;
};

const title2 = L.control({ position: "bottomleft" });
title2.onAdd = function (map) {
  let div = L.DomUtil.create("div", "title");
  div.innerHTML = "<h2>USDA Rural Development Grant Awards, FY '92</h2>";
  return div;
};

logo1.addTo(map1);
logo2.addTo(map2);

title1.addTo(map1);
title2.addTo(map2);
