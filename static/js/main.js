var year = ["2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"];
var year_Title = "2011-2018";
var district = [
  "Bartow",
  "Lake City",
  "Chipley",
  "Fort Lauderdale",
  "DeLand",
  "Miami",
  "Tampa",
  "Turnpike Enterprise",
];
var countyName = [
  "Charlotte",
  "Citrus",
  "Collier",
  "Desoto",
  "Glades",
  "Hardee",
  "Hendry",
  "Hernando",
  "Highlands",
  "Hillsborough",
  "Lake",
  "Lee",
  "Manatee",
  "Pasco",
  "Pinellas",
  "Polk",
  "Sarasota",
  "Sumter",
  "Alachua",
  "Baker",
  "Bradford",
  "Columbia",
  "Dixie",
  "Gilchrist",
  "Hamilton",
  "Lafayette",
  "Levy",
  "Madison",
  "Marion",
  "Suwannee",
  "Taylor",
  "Union",
  "Bay",
  "Calhoun",
  "Escambia",
  "Franklin",
  "Gadsden",
  "Gulf",
  "Holmes",
  "Jackson",
  "Jefferson",
  "Leon",
  "Liberty",
  "Okaloosa",
  "Santa Rosa",
  "Wakulla",
  "Walton",
  "Washington",
  "Brevard",
  "Clay",
  "Duval",
  "Flagler",
  "Nassau",
  "Orange",
  "Putnam",
  "Seminole",
  "St Johns",
  "Volusia",
  "Broward",
  "Miami-Dade",
  "Indian River",
  "Martin",
  "Monroe",
  "Okeechobee",
  "Osceola",
  "Palm Beach",
  "St Lucie",
];
var dist_to_county = {
  1: [
    "Charlotte",
    "Collier",
    "Desoto",
    "Glades",
    "Hardee",
    "Hendry",
    "Highlands",
    "Lee",
    "Manatee",
    "Polk",
    "Sarasota",
    "Okeechobee",
  ],
  2: [
    "Alachua",
    "Baker",
    "Bradford",
    "Columbia",
    "Dixie",
    "Gilchrist",
    "Hamilton",
    "Lafayette",
    "Levy",
    "Madison",
    "Suwannee",
    "Taylor",
    "Union",
    "Clay",
    "Duval",
    "Nassau",
    "Putnam,St Johns",
  ],
  3: [
    "Bay",
    "Calhoun",
    "Escambia",
    "Franklin",
    "Gadsden",
    "Gulf",
    "Holmes",
    "Jackson",
    "Jefferson",
    "Leon",
    "Liberty",
    "Okaloosa",
    "Santa Rosa",
    "Wakulla",
    "Walton",
    "Washington",
  ],
  4: ["Broward", "Indian River", "Martin", "Palm Beach", "St Lucie"],
  5: [
    "Lake",
    "Sumter",
    "Marion",
    "Brevard",
    "Flagler",
    "Orange",
    "Osceola",
    "Seminole",
    "Volusia",
  ],
  6: ["Miami-Dade", "Monroe"],
  7: ["Citrus", "Hernando", "Hillsborough", "Pasco", "Pinellas"],
};

getData();
async function getData() {
  const response = await fetch("/dashboard");
  const data = await response.json();
  await sleep(2000);
  var selectCounty = document.getElementById("county");
  for (var cnt in countyName) {
    var optionCounty = document.createElement("option");
    optionCounty.text = countyName[cnt];
    optionCounty.value = ++cnt;
    selectCounty.add(optionCounty);
  }
  year_Title = "2011-2018";
  drawVisualization(data);
  map_fatalities(data["mapFatalities"]);
  map_injuries(data["mapInjuries"]);
}

//it won't load the page till it get all the API data
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function updateData(filter) {
  //resetting the variables
  yearValue = null;
  districtValue = null;
  countyValue = null;

  if (filter["year"] && filter["year"][0] > 0) {
    yearValue = filter["year"];
  }
  if (filter["district"] && filter["district"] > 0) {
    districtValue = filter["district"];
  }
  if (filter["county"] && filter["county"] > 0) {
    countyValue = filter["county"];
  }

  uri_api = `dashboard/${yearValue}/${districtValue}/${countyValue}`;
  const response = await fetch(uri_api);
  const data = await response.json();
  //console.log(data);
  if (yearValue === null) {
    year_Title = "2011-2018";
  } else {
    yrList = String(yearValue).split(",");
    //console.log(yrList);
    flg = 0;
    if (yrList.length > 2) {
      firstVal = Number(yrList[0]);
      for (var i = 1; i < yrList.length; i++) {
        firstVal = firstVal + 1;
        if (yrList[i] == firstVal) {
          //console.log(yrList[i] + " ---> " + firstVal);
          continue;
        } else flg = 1;
      }
      if (flg === 0) {
        year_Title = yrList[0] + "-" + firstVal;
      } else year_Title = yearValue;
    } else {
      year_Title = yearValue;
    }
  }
  drawVisualization(data);
  addFatalityMapMarker(data["mapFatalities"]);
  map_injuries(data["mapInjuries"]);
}

//Creating Dynamic dropdowns for the main filter section
function initialLoad() {
  var selectYear = document.getElementById("year");
  for (cnt in year) {
    // console.log("year:"+year[cnt]);
    var optionYear = document.createElement("option");
    optionYear.text = year[cnt];
    optionYear.value = year[cnt];
    selectYear.add(optionYear);
  }
  //document.getElementById("year").multiple = true; // to enable multi-select

  var selectDistrict = document.getElementById("district");
  for (cnt in district) {
    var optionDistrict = document.createElement("option");
    optionDistrict.text = district[cnt];
    optionDistrict.value = ++cnt;
    selectDistrict.add(optionDistrict);
  }

  var selectCounty = document.getElementById("county");
  for (cnt in countyName) {
    var optionCounty = document.createElement("option");
    optionCounty.text = countyName[cnt];
    optionCounty.value = ++cnt;
    selectCounty.add(optionCounty);
  }
}

//Show the county in the dropdown with respect to the selected district
function updateCounty() {
  var e = document.getElementById("district");
  var result = e.options[e.selectedIndex].value;
  countyArray = dist_to_county[result];
  //console.log(countyArray);

  var countyDropdown = document.getElementById("county");

  $("#county").empty().append('<option value="0">--Select County--</option>');
  var selectCounty = document.getElementById("county");
  for (cnt in countyArray) {
    var optionCounty = document.createElement("option");
    optionCounty.text = countyArray[cnt];
    optionCounty.value = ++cnt;
    selectCounty.add(optionCounty);
  }
}

//-------------------------------------------------------
//--------Submit Button----------------------------------
//-------------------------------------------------------
function submitButton() {
  yearSelected = $("#year").val();
  districtSelected = document.getElementById("district");
  countySelected = document.getElementById("county");
  county = countySelected.options[countySelected.selectedIndex].text;
  if (county.includes("County")) {
    countyVal = "";
  } else {
    countyVal = countyName.indexOf(county) + 1;
  }
  filter = {
    year: yearSelected,
    district: districtSelected.options[districtSelected.selectedIndex].value,
    county: countyVal.toString(),
  };
  year_Title = yearSelected;
  //console.log("yearSelected:" + yearSelected);

  //console.log("filter:", filter);
  updateData(filter);
}

//-------------------------------------------------------
//------------------Creating google graphs---------------
//-------------------------------------------------------
google.load("visualization", "1", { packages: ["corechart"] });
//google.setOnLoadCallback(drawVisualization);

function drawVisualization(data) {
  //console.log(data);
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let weekday = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  let graph1_fatalities = [["Year", "MC Fatalities", "Fatalities"]];
  for (i = 0; i < data["fatal"].length; i++) {
    graph1_fatalities.push([
      String(data["fatal"][i]["year"]),
      data["fatal"][i]["fatalities"],
      data["traffic"][i]["fatalities"],
    ]);
  }

  // let graph2_proportions = [
  //   [
  //     "Weekday",
  //     "Proportion of MC crashes in Traffic Crashes",
  //     "Proportion of MC Fatalities in Traffic Fatalities",
  //   ],
  //   ["2011", 3.2, 18.8],
  //   ["2012", 3.8, 18.8],
  //   ["2013", 3.3, 19.2],
  //   ["2014", 3.1, 18],
  //   ["2015", 2.9, 19.9],
  //   ["2016", 2.7, 17.2],
  //   ["2017", 2.6, 17.7],
  //   ["2018", 2.4, 17.1],
  // ];

  let graph2_weekly = [
    ["WeekDay", "Motorcycle Fatalities", "Motorcycle Injuries"],
  ];
  for (i = 0; i < data["weeklydata"].length; i++) {
    let week_idx = data["weeklydata"][i]["week"] - 2;
    // console.log("week_idx:" + week_idx + " ::" + weekday[week_idx]);
    graph2_weekly.push([
      weekday[week_idx],
      data["weeklydata"][i]["fatal"],
      data["weeklydata"][i]["injured"],
    ]);
  }

  //console.log("graph2_weekly------->>>>" + graph2_weekly);

  let graph3_injuredByMonth = [
    ["Month", "MC Operators Injured", "MC Passengers Injured"],
  ];

  for (i = 0; i < data["injuredAvg"].length; i++) {
    let month_index = data["injuredAvg"][i]["month"] - 1;
    //console.log("months" + months[month_index] + " " + month_index);
    graph3_injuredByMonth.push([
      months[month_index],
      data["injuredAvg"][i]["fatal_mcOperator"],
      data["injuredAvg"][i]["fatal_mcPassenger"],
    ]);
  }

  let graph4_fatalAvg = [
    ["Month", "MC Operators Killed", "MC Passengers killed"],
  ];
  for (i = 0; i < data["fatalAvg"].length; i++) {
    let month_index = data["fatalAvg"][i]["month"] - 1;
    graph4_fatalAvg.push([
      months[month_index],
      data["fatalAvg"][i]["fatal_mcOperator"],
      data["fatalAvg"][i]["fatal_mcPassenger"],
    ]);
  }
  var dataFatalities = google.visualization.arrayToDataTable(graph1_fatalities);
  // var dataProportions = google.visualization.arrayToDataTable(
  //   graph2_proportions
  // );
  var weeklyData = google.visualization.arrayToDataTable(graph2_weekly);
  var injuredByMonth = google.visualization.arrayToDataTable(
    graph3_injuredByMonth
  );
  var fatalByMonth = google.visualization.arrayToDataTable(graph4_fatalAvg);

  var optionsFatalities = {
    title: "Motorcycle Fatalities in Florida (" + year_Title + ")",
    chartArea: { width: "70%" },
    vAxes: {
      0: {
        title: "Motorcycle Fatalities",
        minValue: 0,
        titleTextStyle: { bold: 0, italic: 0 },
      },
      1: {
        title: "Traffic Fatalities",
        minValue: 0,
        titleTextStyle: { bold: 0, italic: 0 },
      },
    },
    hAxis: {
      title: "",
      titleTextStyle: { bold: 1, italic: 0 },
      textStyle: { color: "#848484", bold: false, fontSize: 12 },
      format: "",
      // ticks: [
      //   "2011",
      //   "2012",
      //   "2013",
      //   "2014",
      //   "2015",
      //   "2016",
      //   "2017",
      //   "2018",
      //   "2019",
      // ],
      slantedText: false,
      slantedTextAngle: 90,
    },
    seriesType: "bars",
    series: {
      0: { targetAxisIndex: 0, type: "bars" },
      1: {
        targetAxisIndex: 1,
        type: "line",
        pointShape: "circle",
        color: "blue",
        pointSize: 8,
        lineWidth: 2,
      },
      0: { color: "red" },
    },
    legend: { position: "bottom" },
    backgroundColor: "#FFFFFF",
  };

  // var optionsProportions = {
  //   title:
  //     "Proportion of Motorcycle (MC) Crashes and Fatalities in Florida (" +
  //     year_Title +
  //     ")",
  //   chartArea: { width: "85%" },
  //   vAxis: {
  //     title: "Values in Percentage(%)",
  //     titleTextStyle: { bold: 1, italic: 0 },
  //   },
  //   hAxis: {
  //     title: "",
  //     titleTextStyle: { bold: 1, italic: 0 },
  //     format: "",
  //     minValue: 2011,
  //     maxValue: 2019,
  //     ticks: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
  //     textStyle: { color: "#848484", bold: false, fontSize: 12 },
  //     slantedText: false,
  //     slantedTextAngle: 90,
  //   },
  //   seriesType: "lines",
  //   series: {
  //     0: { pointShape: "circle", pointSize: 8, lineWidth: 2 },
  //     1: { pointShape: "circle", pointSize: 8, lineWidth: 2 },
  //   },
  //   legend: { position: "bottom" },
  //   backgroundColor: "#FFFFFF",
  // };

  var optionsWeekly = {
    title:
      "Motorcycle Fatalities and Injuries by Day Of Week (" + year_Title + ")",
    chartArea: { width: "80%" },
    vAxis: {
      title: "Number of cases",
      titleTextStyle: { bold: 0, italic: 0 },
    },
    hAxis: {
      title: "",
      titleTextStyle: { bold: 1, italic: 0 },
      format: "",
      textStyle: { color: "#848484", bold: false, fontSize: 12 },
      slantedText: false,
      slantedTextAngle: 90,
    },
    seriesType: "lines",
    series: {
      0: { pointShape: "circle", pointSize: 8, lineWidth: 2, color: "red" },
      1: { pointShape: "circle", pointSize: 8, lineWidth: 2, color: "blue" },
    },
    legend: { position: "bottom" },
    backgroundColor: "#FFFFFF",
  };

  var optionsinjuredByMonth = {
    title: "Seriously Injured Motorcyclists by Month (" + year_Title + ")",
    chartArea: { width: "90%" },
    vAxis: { title: "", titleTextStyle: { bold: 1, italic: 0 } },
    hAxis: {
      title: "",
      titleTextStyle: { bold: 1, italic: 0 },
      textStyle: { color: "#848484", bold: false, fontSize: 12 },
      ticks: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    seriesType: "bars",
    isStacked: true,
    legend: { position: "bottom" },
    backgroundColor: "#ffffff",
  };

  var optionsfatalByMonth = {
    chartArea: { width: "85%" },
    title: "Motorcycle(MC) Fatalities by Month (" + year_Title + ")",
    vAxis: { title: "", titleTextStyle: { bold: 1, italic: 0 } },
    hAxis: {
      title: "",
      titleTextStyle: { bold: 1, italic: 0 },
      ticks: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      textStyle: { color: "#848484", bold: false, fontSize: 12 },
      slantedText: false,
      slantedTextAngle: 90,
    },
    seriesType: "bars",
    isStacked: true,
    legend: { position: "bottom" },
    backgroundColor: "#FFFFFF",
  };
  // var exportGraphs = document.getElementById("graphs-content");

  // console.log(
  //   data["fatal"].length +
  //     "  " +
  //     data["traffic"].length +
  //     "  " +
  //     data["injuredAvg"].length +
  //     "  " +
  //     data["fatalAvg"].length +
  //     "  " +
  //     data["weeklydata"].length
  // );

  if (data["fatal"].length > 0 && data["traffic"].length > 0) {
    var chartFatalities = new google.visualization.ComboChart(
      document.getElementById("Fatalities")
    );

    // google.visualization.events.addListener(
    //   chartFatalities,
    //   "ready",
    //   function () {
    //     // fatalities_img = '<img src="' + chartFatalities.getImageURI() + '">';
    //     // exportGraphs.append(fatalities_img);
    //     exportGraphs.innerHTML =
    //       '<img src="' + chartFatalities.getImageURI() + '">';
    //   }
    // );
    chartFatalities.draw(dataFatalities, optionsFatalities);
  } else {
    let divID = document.getElementById("Fatalities");
    divID.innerHTML =
      "<b>Motorcycle Fatalities</b> graph: There is no data available for the selected filter. Please choose different filter values.<br><br><br><br><br><br><br><br><br>";
  }
  // var chartProportions = new google.visualization.ComboChart(
  //   document.getElementById("proportions")
  // );
  // chartProportions.draw(dataProportions, optionsProportions);

  if (data["weeklydata"].length > 0) {
    var chartWeekly = new google.visualization.ComboChart(
      document.getElementById("weekly")
    );
    chartWeekly.draw(weeklyData, optionsWeekly);
  } else {
    let divID = document.getElementById("weekly");
    divID.innerHTML =
      "<b>Motorcycle Fatalities and Injuries by Day Of Week</b> graph: There is no data available for the selected filter. Please choose different filter values.<br><br><br><br><br><br><br><br><br>";
  }

  if (data["injuredAvg"].length > 0) {
    var chartInjuredByMonth = new google.visualization.ComboChart(
      document.getElementById("injuredByMonth")
    );
    chartInjuredByMonth.draw(injuredByMonth, optionsinjuredByMonth);
  } else {
    let divID = document.getElementById("injuredByMonth");
    divID.innerHTML =
      "<b>Seriously Injured  Motorcyclists by Month</b> graph: There is no data available for the selected filter. Please choose different filter values.<br><br><br><br><br><br><br><br><br>";
  }

  if (data["fatalAvg"].length > 0) {
    var chartFatalByMonth = new google.visualization.ComboChart(
      document.getElementById("fatalByMonth")
    );
    chartFatalByMonth.draw(fatalByMonth, optionsfatalByMonth);
  } else {
    let divID = document.getElementById("fatalByMonth");
    divID.innerHTML =
      "<b>Motorcyclists Fatalities by Month</b> graph: There is no data available for the selected filter. Please choose different filter values.<br><br><br><br><br><br><br><br><br>";
  }
}

//****Code for Maps ****/
//********************** */
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
  {
    county: "Hamilton",
    latitude: 30.47559579999999,
    lng: -82.95015579999999,
  },
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
// ***************Fatalities Map ***************
function map_fatalities(data) {
  //console.log("*************inside map_fatalities********");
  //console.log(data);
  var mymap = L.map("mapForFatalities").setView([28, -82], 6);

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

  //Adding Marker To the Map with Popup

  //console.log(fatalities);
  addFatalityMapMarker(data, mymap);

  // Show the ribbon
  var fatal_info = L.control();

  fatal_info.onAdd = function (mymap) {
    this._div = L.DomUtil.create("div", "info_map");
    this.update();
    return this._div;
  };

  fatal_info.update = function () {
    this._div.innerHTML =
      "<h4>Motorcycle Fatalities By County<br/> (2011 - 2019)<br/></h4>";
  };

  fatal_info.addTo(mymap);
}

function addFatalityMapMarker(data, mymap) {
  let fatalities = {};
  for (var i in data) {
    fatalities[data[i]["county_name"]] = data[i]["fatalities"];
  }
  for (var i = 0; i < CountyCordinates.length; i++) {
    var circle = L.circle(
      [CountyCordinates[i]["latitude"], CountyCordinates[i]["lng"]],

      {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: 15500,
      }
    )
      .bindPopup(
        String(CountyCordinates[i]["county"]) +
          ":" +
          fatalities[CountyCordinates[i]["county"]]
      )
      .addTo(mymap);
  }
}
//****** Map for Injuries *****/
function map_injuries(data) {
  var injury_mp = L.map("mapForInjuries").setView([28, -82], 6);

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
  ).addTo(injury_mp);

  injury_mp.attributionControl.addAttribution(
    'Data &copy; <a href="https://www.fdot.gov/">Florida Dept. Of Transportation</a>'
  );

  let injuries = {};
  for (var i in data) {
    injuries[data[i]["county_name"]] = data[i]["injured"];
  }
  //console.log(injuries);
  for (var i = 0; i < CountyCordinates.length; i++) {
    var circle = L.circle(
      [CountyCordinates[i]["latitude"], CountyCordinates[i]["lng"]],

      {
        color: "#5C33FF",
        fillColor: "#83BDDC",
        fillOpacity: 0.5,
        radius: 15500,
      }
    )
      .bindPopup(
        String(CountyCordinates[i]["county"]) +
          ":" +
          injuries[CountyCordinates[i]["county"]]
      )
      .addTo(injury_mp);
  }

  // control that shows county info on hover
  var injury_info = L.control();

  injury_info.onAdd = function (injury_mp) {
    this._div = L.DomUtil.create("div", "info_map");
    this.update();
    return this._div;
  };

  injury_info.update = function () {
    this._div.innerHTML =
      "<h4>Motorcycle Injuries By County<br/> (2011 - 2019)<br/></h4>";
  };

  injury_info.addTo(injury_mp);
}
