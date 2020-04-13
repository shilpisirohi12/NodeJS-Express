var CountyCordinates = [
  { county: "Charlotte", latitude: 26.8946009, lng: -81.909826 },
  { county: "Citrus", latitude: 28.8848842, lng: -82.5185837 },
  { county: "Collier", latitude: 26.069985, lng: -81.42789839999999 },
  { county: "Desoto", latitude: 27.2142078, lng: -81.77870209999999 },
  { county: "Glades", latitude: 26.984415, lng: -81.0754657 },
  { county: "Hardee", latitude: 27.4501733, lng: -81.8224362 },
  { county: "Hendry", latitude: 26.6105319, lng: -81.0754657 },
  { county: "Hernando", latitude: 28.8999815, lng: -82.37454009999999 },
  { county: "Highlands", latitude: 27.3400286, lng: -81.34002679999999 },
  { county: "Hillsborough", latitude: 27.9903597, lng: -82.3017728 },
  { county: "Lake", latitude: 28.702847, lng: -81.77870209999999 },
  { county: "Lee", latitude: 30.4196584, lng: -83.30042159999999 },
  { county: "Manatee", latitude: 27.4799195, lng: -82.34518899999999 },
  { county: "Pasco", latitude: 28.3232418, lng: -82.4319405 },
  { county: "Pinellas", latitude: 27.876394, lng: -82.7778579 },
  { county: "Polk", latitude: 27.8617347, lng: -81.6911559 },
  { county: "Sarasota", latitude: 27.3364347, lng: -82.53065269999999 },
  { county: "Sumter", latitude: 28.6747526, lng: -82.08429009999999 },
  { county: "Alachua", latitude: 29.7938144, lng: -82.49442260000001 },
  { county: "Baker", latitude: 30.7971318, lng: -86.681344 },
  { county: "Bradford", latitude: 29.97238179999999, lng: -82.1713632 },
  { county: "Columbia", latitude: 30.1812696, lng: -82.605118 },
  { county: "Dixie", latitude: 29.5207227, lng: -83.1649001 },
  { county: "Gilchrist", latitude: 29.6871128, lng: -82.82097399999999 },
  { county: "Hamilton", latitude: 30.47559579999999, lng: -82.95015579999999 },
  { county: "Lafayette", latitude: 30.0299573, lng: -83.2077645 },
  { county: "Levy", latitude: 29.3178545, lng: -82.82097399999999 },
  { county: "Madison", latitude: 30.4693772, lng: -83.41292539999999 },
  { county: "Marion", latitude: 29.2787765, lng: -82.12783999999999 },
  { county: "Suwannee", latitude: 29.3288499, lng: -83.14429439999999 },
  { county: "Taylor", latitude: 30.0993767, lng: -83.67739279999999 },
  { county: "Union", latitude: 30.0745112, lng: -82.34518899999999 },
  { county: "Bay", latitude: 30.1805306, lng: -85.684578 },
  { county: "Calhoun", latitude: 30.3475302, lng: -85.1894045 },
  { county: "Escambia", latitude: 30.6389408, lng: -87.3413599 },
  { county: "Franklin", latitude: 29.7817695, lng: -84.8567932 },
  { county: "Gadsden", latitude: 30.5562947, lng: -84.6479124 },
  { county: "Gulf", latitude: 29.8001623, lng: -85.35496499999999 },
  { county: "Holmes", latitude: 30.8740806, lng: -85.80766 },
  { county: "Jackson", latitude: 30.3321838, lng: -81.65565099999999 },
  { county: "Jefferson", latitude: 30.4311978, lng: -83.8897057 },
  { county: "Leon", latitude: 30.4906177, lng: -84.1857115 },
  { county: "Liberty", latitude: 30.1507777, lng: -84.8567932 },
  { county: "Okaloosa", latitude: 30.57734009999999, lng: -86.6611083 },
  { county: "Santa Rosa", latitude: 30.3960324, lng: -86.2288322 },
  { county: "Wakulla", latitude: 30.1301689, lng: -84.3542049 },
  { county: "Walton", latitude: 30.56401989999999, lng: -86.17517590000001 },
  { county: "Washington", latitude: 30.548737, lng: -85.684578 },
  { county: "Brevard", latitude: 28.263933, lng: -80.7214417 },
  { county: "Clay", latitude: 29.9943564, lng: -81.77870209999999 },
  { county: "Duval", latitude: 30.3500511, lng: -81.6035062 },
  { county: "Flagler", latitude: 29.4086072, lng: -81.2518833 },
  { county: "Nassau", latitude: 30.5927334, lng: -81.8224362 },
  { county: "Orange", latitude: 28.4844995, lng: -81.2518833 },
  { county: "Putnam", latitude: 29.6265157, lng: -81.77870209999999 },
  { county: "Seminole", latitude: 27.8397466, lng: -82.79121339999999 },
  { county: "St Johns", latitude: 30.0820653, lng: -81.5471201 },
  { county: "Volusia", latitude: 29.0279842, lng: -81.0754657 },
  { county: "Broward", latitude: 26.190096, lng: -80.365865 },
  { county: "Miami-Dade", latitude: 25.5516034, lng: -80.6326916 },
  { county: "Indian River", latitude: 28.2142068, lng: -80.6431877 },
  { county: "Martin", latitude: 27.0804935, lng: -80.4103957 },
  { county: "Monroe", latitude: 24.5557001, lng: -81.78259849999999 },
  { county: "Okeechobee", latitude: 27.2439349, lng: -80.82978279999999 },
  { county: "Osceola", latitude: 28.1019838, lng: -81.0754657 },
  { county: "Palm Beach", latitude: 26.7056206, lng: -80.0364297 },
  { county: "St Lucie", latitude: 27.499208, lng: -80.34219840000002 },
];

var mapboxAccessToken =
  "pk.eyJ1Ijoic2hpbHBpc2lyb2hpMTIiLCJhIjoiY2s1cGhicTZ0MGhyMTNucGM2eGs2aWozMSJ9.jcR_T1ff0mJvlqWUt8Ge0w";

var mymap = L.map("mapForInjuries").setView([28, -82], 6);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: mapboxAccessToken,
  }
).addTo(mymap);

mymap.attributionControl.addAttribution(
  'Data &copy; <a href="https://www.fdot.gov/">Florida Dept. Of Transportation</a>'
);

for (var i = 0; i < CountyCordinates.length; i++) {
  // console.log(
  //   CountyCordinates[i]["county"] + ":" + CountyCordinates[i]["latitude"]
  // );
  // var marker = L.marker([
  //   CountyCordinates[i]["latitude"],
  //   CountyCordinates[i]["lng"],
  // ])
  //   .addTo(mymap)
  //   .bindPopup(CountyCordinates[i]["county"]);
  var circle = L.circle(
    [CountyCordinates[i]["latitude"], CountyCordinates[i]["lng"]],

    {
      color: "#5C33FF",
      fillColor: "#83BDDC",
      fillOpacity: 0.5,
      radius: 15500,
    }
  )
    .bindPopup(String(CountyCordinates[i]["county"]))
    .addTo(mymap);
}

// control that shows county info on hover
var injury_info = L.control();

injury_info.onAdd = function (mymap) {
  this._div = L.DomUtil.create("div", "info_map");
  this.update();
  return this._div;
};

injury_info.update = function () {
  this._div.innerHTML =
    "<h4>Motorcycle Injuries By County<br/> (2011 - 2019)<br/></h4>";
};

injury_info.addTo(mymap);
