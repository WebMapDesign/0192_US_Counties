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

let map = L.map("map", {
  fullScreenControl: true,
  zoomSnap: 1,
  minZoom: 5,
}).setView([38, -97], 5);

let layerTilesOSM = new L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors</a>',
  }
).addTo(map);

L.control
  .scale({ metric: true, imperial: true, position: "bottomright" })
  .addTo(map);

const fsControl = L.control.fullscreen();
map.addControl(fsControl);

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
}).addTo(map);
