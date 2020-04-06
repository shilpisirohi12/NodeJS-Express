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
  console.log(path.join(__dirname, "./routes"));
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

// URL for graph 1
fatalities_url = new URL(
  "/api/v1/resources/getFatalities",
  "http://127.0.0.1:5000"
);
trafficFatal_url = new URL(
  "/api/v1/resources/getTrafficFatalities",
  "http://127.0.0.1:5000"
);

// URL for graph 3 Seriously Injured Motorcyclists by Month (2016-2018 Average)
InjuredAverage_url = new URL(
  "/api/v1/resources/getInjuredOperators",
  "http://127.0.0.1:5000"
);

// URL for graph# 4 fatal Motorcyclists by Month (2016-2018 Average)
fatalAverage_url = new URL(
  "/api/v1/resources/getFatlMCOperators",
  "http://127.0.0.1:5000"
);

app.get("/", async (request, response) => {
  response.render("pages/index", {
    title: "Motorcycle Accident Data Dashbaord",
  });
});

app.get("/dashboard", async (request, response) => {
  console.log("inside dashboard endpoint");
  const fatal_response = await fetch(fatalities_url, { mode: "no-cors" });
  const fatal_data = await fatal_response.json();

  const traffic_response = await fetch(trafficFatal_url, { mode: "no-cors" });
  const trafficFatal_data = await traffic_response.json();

  const injAvg_response = await fetch(InjuredAverage_url, { mode: "no-cors" });
  const injuredAvg_data = await injAvg_response.json();

  const fatalAvg_response = await fetch(fatalAverage_url, { mode: "no-cors" });
  const fatalAvg_data = await fatalAvg_response.json();

  data = {
    fatal: fatal_data,
    traffic: trafficFatal_data,
    injuredAvg: injuredAvg_data,
    fatalAvg: fatalAvg_data,
  };

  response.json(data);
});

app.use((request, response, next) => {
  console.error();

  return next(createError(404, "File Not Found!!!!!"));
});

app.use((err, request, response) => {
  response.locals.message = err.message;
  const status = err.status || 500;
  response.locals.status = status;
  response.render("error");
});
