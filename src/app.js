const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const port = process.env.PORT || 3000;

//  define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views loaction
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory
app.use(express.static(publicDirectoryPath));

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Pin Sukjaroen",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Pin Sukjaroen",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "About Me",
    helpText: "Call 089123323 for ask",
    title: "Help",
    name: "Pin Sukjaroen",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      errorMessage: "error please provide addrss.",
    });
  }
  geocode(address, (err, { latitude, longtitude, location } = {}) => {
    if (err) {
      return res.send({ err });
    }
    forecast(latitude, longtitude, (err, data) => {
      if (err) {
        return res.send({ err });
      }
      return res.send({
        forecast: data,
        location,
        address,
      });
    });
  });
  
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You mus provide search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Pin Sukjaroen",
    errorMessage: "Help Article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Pin Sukjaroen",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is run in port : "+port);
});
