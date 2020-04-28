const express = require("express");
const path = require("path");
const cookieSession = require("cookie-session");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
const port = process.env.PORT || 3000;

// Starting the server
app.listen(port, () => {
  //console.log(path.join(__dirname, "./routes"));
  console.log(`Listening the port ${port}....`);
});

// Setting cookies
app.set("trust proxy", 1);
app.use(
  cookieSession({
    name: "session",
    keys: ["nodejsDashboard", "expressJsDashboard"],
  })
);

app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.static(path.join(__dirname, "./static")));
api_url = "http://3.86.38.185:5000";
// URL for graph 1
fatalities_url = new URL("/api/v1/resources/getFatalities", api_url);
trafficFatal_url = new URL("/api/v1/resources/getTrafficFatalities", api_url);

// URL for graph 3 Seriously Injured Motorcyclists by Month (2016-2018 Average)
InjuredAverage_url = new URL("/api/v1/resources/getInjuredOperators", api_url);

// URL for graph# 4 fatal Motorcyclists by Month (2016-2018 Average)
fatalAverage_url = new URL("/api/v1/resources/getFatlMCOperators", api_url);

weeklyData_url = new URL("/api/v1/resources/getByDayOfWeek", api_url);

mapInjuries_url = new URL("/api/v1/resources/getmcInjuryByCounty", api_url);

mapFatalities_url = new URL("/api/v1/resources/getmcFatalityByCounty", api_url);

app.get("/", async (request, response) => {
  response.render("pages/index", {
    title: "Motorcycle Accident Data Dashbaord",
  });
});

app.get("/dashboard/", async (request, response) => {
  console.log("inside dashboard endpoint");
  const fatal_response = await fetch(fatalities_url, { mode: "no-cors" });
  const fatal_data = await fatal_response.json();

  const traffic_response = await fetch(trafficFatal_url, { mode: "no-cors" });
  const trafficFatal_data = await traffic_response.json();

  const injAvg_response = await fetch(InjuredAverage_url, { mode: "no-cors" });
  const injuredAvg_data = await injAvg_response.json();

  const fatalAvg_response = await fetch(fatalAverage_url, { mode: "no-cors" });
  const fatalAvg_data = await fatalAvg_response.json();

  const weeklyData_response = await fetch(weeklyData_url, { mode: "no-cors" });
  const weeklyData_data = await weeklyData_response.json();

  const mapInjury_response = await fetch(mapInjuries_url, { mode: "no-cors" });
  const mapInjury_data = await mapInjury_response.json();

  const mapFatalities_response = await fetch(mapFatalities_url, {
    mode: "no-cors",
  });
  const mapFatalities_data = await mapFatalities_response.json();

  data = {
    fatal: fatal_data,
    traffic: trafficFatal_data,
    injuredAvg: injuredAvg_data,
    fatalAvg: fatalAvg_data,
    weeklydata: weeklyData_data,
    mapInjuries: mapInjury_data,
    mapFatalities: mapFatalities_data,
  };

  response.json(data);
});

app.get("/dashboard/:year/:district/:county", async (request, response) => {
  // console.log("Quering with year, district, county--->>>");
  let yr = request.params.year;
  let dist = request.params.district;
  let county = request.params.county;

  let fatalities_update = fatalities_url;
  let traffic_update = trafficFatal_url;
  let injAvg_update = InjuredAverage_url;
  let fatalAvg_update = fatalAverage_url;
  let week_update = weeklyData_url;
  let mapInjuries_update = mapInjuries_url;
  let mapFatalities_update = mapFatalities_url;

  // Creating API endpoints URL
  if (yr !== "null") {
    fatalities_update = fatalities_update + "?year=" + yr;
    traffic_update = traffic_update + "?year=" + yr;
    injAvg_update = injAvg_update + "?year=" + yr;
    fatalAvg_update = fatalAvg_update + "?year=" + yr;
    week_update = week_update + "?year=" + yr;
    mapInjuries_update = mapInjuries_update + "?year=" + yr;
    mapFatalities_update = mapFatalities_update + "?year=" + yr;

    if (dist !== "null") {
      fatalities_update = fatalities_update + "&district=" + dist;
      traffic_update = traffic_update + "&district=" + dist;
      injAvg_update = injAvg_update + "&district=" + dist;
      fatalAvg_update = fatalAvg_update + "&district=" + dist;
      week_update = week_update + "&district=" + dist;
      mapInjuries_update = mapInjuries_update + "&district=" + dist;
      mapFatalities_update = mapFatalities_update + "&district=" + dist;
    }
    if (county !== "null") {
      fatalities_update = fatalities_update + "&county=" + county;
      traffic_update = traffic_update + "&county=" + county;
      injAvg_update = injAvg_update + "&county=" + county;
      fatalAvg_update = fatalAvg_update + "&county=" + county;
      week_update = week_update + "&county=" + county;
      mapInjuries_update = mapInjuries_update + "&county=" + county;
      mapFatalities_update = mapFatalities_update + "&county=" + county;
    }
  } else if (dist !== "null") {
    fatalities_update = fatalities_update + "?district=" + dist;
    traffic_update = traffic_update + "?district=" + dist;
    injAvg_update = injAvg_update + "?district=" + dist;
    fatalAvg_update = fatalAvg_update + "?district=" + dist;
    week_update = week_update + "?district=" + dist;
    mapInjuries_update = mapInjuries_update + "?district=" + dist;
    mapFatalities_update = mapFatalities_update + "?district=" + dist;
    if (county !== "null") {
      fatalities_update = fatalities_update + "&county=" + county;
      traffic_update = traffic_update + "&county=" + county;
      injAvg_update = injAvg_update + "&county=" + county;
      fatalAvg_update = fatalAvg_update + "&county=" + county;
      week_update = week_update + "&county=" + county;
      mapInjuries_update = mapInjuries_update + "&county=" + county;
      mapFatalities_update = mapFatalities_update + "&county=" + county;
    }
  } else if (county !== "null") {
    fatalities_update = fatalities_update + "?county=" + county;
    traffic_update = traffic_update + "?county=" + county;
    injAvg_update = injAvg_update + "?county=" + county;
    fatalAvg_update = fatalAvg_update + "?county=" + county;
    week_update = week_update + "?county=" + county;
    mapInjuries_update = mapInjuries_update + "&county=" + county;
    mapFatalities_update = mapFatalities_update + "&county=" + county;
  }

  // console.log("fatalities URL: " + fatalities_update);
  // console.log("traffic_update URL: " + traffic_update);
  // console.log("injAvg_update URL: " + injAvg_update);
  // console.log("fatalAvg_update URL: " + fatalAvg_update);

  const fatal_response = await fetch(fatalities_update, { mode: "no-cors" });
  const fatal_data = await fatal_response.json();

  const traffic_response = await fetch(traffic_update, { mode: "no-cors" });
  const trafficFatal_data = await traffic_response.json();

  const injAvg_response = await fetch(injAvg_update, { mode: "no-cors" });
  const injuredAvg_data = await injAvg_response.json();

  const fatalAvg_response = await fetch(fatalAvg_update, { mode: "no-cors" });
  const fatalAvg_data = await fatalAvg_response.json();

  const weeklyData_response = await fetch(week_update, { mode: "no-cors" });
  const weeklyData_data = await weeklyData_response.json();

  const mapInjury_response = await fetch(mapInjuries_url, { mode: "no-cors" });
  const mapInjury_data = await mapInjury_response.json();

  const mapFatalities_response = await fetch(mapFatalities_url, {
    mode: "no-cors",
  });
  const mapFatalities_data = await mapFatalities_response.json();

  console.log("URL-->>>" + mapInjuries_url);

  console.log("URL-->>>" + mapFatalities_url);

  data = {
    fatal: fatal_data,
    traffic: trafficFatal_data,
    injuredAvg: injuredAvg_data,
    fatalAvg: fatalAvg_data,
    weeklydata: weeklyData_data,
    mapInjuries: mapInjury_data,
    mapFatalities: mapFatalities_data,
  };

  console.log(data);
  response.json(data);
});

app.use((request, response, next) => {
  console.log("<--------------- inside error ------------->");
  console.error();

  return next(createError(404, "File Not Found!!!!!"));
});

app.use((err, request, response) => {
  response.locals.message = err.message;
  const status = err.status || 500;
  response.locals.status = status;
  response.render("error");
});
