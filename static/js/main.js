year = ["2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"];
district = [
  "Bartow",
  "Lake City",
  "Chipley",
  "Fort Lauderdale",
  "DeLand",
  "Miami",
  "Tampa",
  "Turnpike Enterprise",
];
countyName = [
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
dist_to_county = {
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

dashboard_data = [];
getData();
async function getData() {
  const response = await fetch("/dashboard");
  const data = await response.json();
  console.log(data);
  drawVisualization(data);
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
  console.log(countyArray);

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

//--------submit button------------------
function submitButton() {
  yearSelected = document.getElementById("year");
  districtSelected = document.getElementById("district");
  countySelected = document.getElementById("county");
  console.log("year selected--->" + $("#year").val());
  console.log(
    "selected values--->" +
      districtSelected.options[districtSelected.selectedIndex].value +
      "  " +
      countySelected.options[countySelected.selectedIndex].text
  );
}

//-------------------------------------------------------
//------------------Creating google graphs---------------
//-------------------------------------------------------
google.load("visualization", "1", { packages: ["corechart"] });
//google.setOnLoadCallback(drawVisualization);

function drawVisualization(data) {
  // Some raw data (not necessarily accurate)
  let graph1_fatalities = [["Year", "MC Fatalities", "Fatalities"]];
  for (i = 0; i < data["fatal"].length; i++) {
    graph1_fatalities.push([
      data["fatal"][i]["year"],
      data["fatal"][i]["fatalities"],
      data["traffic"][i]["fatalities"],
    ]);
  }

  let graph2_proportions = [
    [
      "Year",
      "Proportion of MC crashes in Traffic Crashes",
      "Proportion of MC Fatalities in Traffic Fatalities",
    ],
    ["2011", 3.2, 18.8],
    ["2012", 3.8, 18.8],
    ["2013", 3.3, 19.2],
    ["2014", 3.1, 18],
    ["2015", 2.9, 19.9],
    ["2016", 2.7, 17.2],
    ["2017", 2.6, 17.7],
    ["2018", 2.4, 17.1],
  ];

  let graph3_injuredByMonth = [
    ["Month", "MC Operators Injured", "MC Passengers Injured"],
  ];
  for (i = 0; i < data["injuredAvg"].length; i++) {
    graph3_injuredByMonth.push([
      data["injuredAvg"][i]["month"],
      data["injuredAvg"][i]["fatal_mcOperator"],
      data["injuredAvg"][i]["fatal_mcPassenger"],
    ]);
  }

  let graph4_fatalAvg = [
    ["Month", "MC Operators Killed", "MC Passengers killed"],
  ];
  for (i = 0; i < data["fatalAvg"].length; i++) {
    graph4_fatalAvg.push([
      data["fatalAvg"][i]["month"],
      data["fatalAvg"][i]["fatal_mcOperator"],
      data["fatalAvg"][i]["fatal_mcPassenger"],
    ]);
  }
  var dataFatalities = google.visualization.arrayToDataTable(graph1_fatalities);
  var dataProportions = google.visualization.arrayToDataTable(
    graph2_proportions
  );
  var injuredByMonth = google.visualization.arrayToDataTable(
    graph3_injuredByMonth
  );
  var fatalByMonth = google.visualization.arrayToDataTable(graph4_fatalAvg);

  var optionsFatalities = {
    title: "Motorcycle Fatalities in Florida (2011 to 2019)",
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
      format: "",
      minValue: 2000,
      maxValue: 2018,
      ticks: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
      textStyle: { fontSize: 9 },
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
    backgroundColor: "#A2A2A2",
  };

  var optionsProportions = {
    // chartArea:{width:'85%'},
    title:
      "Proportion of Motorcycle (MC) Crashes and Fatalities in Florida (2011-2019)",
    vAxis: {
      title: "Values in Percentage(%)",
      titleTextStyle: { bold: 1, italic: 0 },
    },
    hAxis: {
      title: "",
      titleTextStyle: { bold: 1, italic: 0 },
      format: "",
      minValue: 2000,
      maxValue: 2018,
      ticks: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
      textStyle: { fontSize: 9 },
      slantedText: false,
      slantedTextAngle: 90,
    },
    seriesType: "lines",
    series: {
      0: { pointShape: "circle", pointSize: 8, lineWidth: 2 },
      1: { pointShape: "circle", pointSize: 8, lineWidth: 2 },
    },
    legend: { position: "bottom" },
    backgroundColor: "#A2A2A2",
  };

  var optionsinjuredByMonth = {
    //chartArea:{width:'85%'},
    title: "Seriously Injured Motorcyclists by Month (2016-2018 Average)",
    vAxis: { title: "", titleTextStyle: { bold: 1, italic: 0 } },
    hAxis: {
      title: "",
      titleTextStyle: { bold: 1, italic: 0 },
      format: "",
      minValue: 2000,
      maxValue: 2018,
      ticks: [
        2001,
        2002,
        2003,
        2004,
        2005,
        2006,
        2007,
        2008,
        2009,
        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
      ],
      textStyle: { fontSize: 9 },
      slantedText: false,
      slantedTextAngle: 90,
    },
    seriesType: "bars",
    isStacked: true,
    legend: { position: "bottom" },
    backgroundColor: "#A2A2A2",
  };

  var optionsfatalByMonth = {
    //chartArea:{width:'85%'},
    title: "Motorcycle(MC) Fatalities by Month (2016-2018 Average)",
    vAxis: { title: "", titleTextStyle: { bold: 1, italic: 0 } },
    hAxis: {
      title: "",
      titleTextStyle: { bold: 1, italic: 0 },
      format: "",
      minValue: 2000,
      maxValue: 2018,
      ticks: [
        2001,
        2002,
        2003,
        2004,
        2005,
        2006,
        2007,
        2008,
        2009,
        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
      ],
      textStyle: { fontSize: 9 },
      slantedText: false,
      slantedTextAngle: 90,
    },
    seriesType: "bars",
    isStacked: true,
    legend: { position: "bottom" },
    backgroundColor: "#A2A2A2",
  };
  // console.log("Dataviz graph1_fatalities: ", graph1_fatalities);
  // console.log("Dataviz graph2_proportions: ", graph2_proportions);
  // console.log("Dataviz graph3_injuredByMonth: ", graph3_injuredByMonth);
  // console.log("Dataviz graph4_fatalAvg: ", graph4_fatalAvg);

  var chartFatalities = new google.visualization.ComboChart(
    document.getElementById("Fatalities")
  );
  chartFatalities.draw(dataFatalities, optionsFatalities);

  var chartProportions = new google.visualization.ComboChart(
    document.getElementById("proportions")
  );
  chartProportions.draw(dataProportions, optionsProportions);

  var chartInjuredByMonth = new google.visualization.ComboChart(
    document.getElementById("injuredByMonth")
  );
  chartInjuredByMonth.draw(injuredByMonth, optionsinjuredByMonth);

  var chartFatalByMonth = new google.visualization.ComboChart(
    document.getElementById("fatalByMonth")
  );
  chartFatalByMonth.draw(fatalByMonth, optionsfatalByMonth);
}
