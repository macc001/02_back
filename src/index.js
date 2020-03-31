const expres = require("express");
const app = expres();
var cors = require("cors");
const bodyParser = require("body-parser");

app.set("port", process.env.PORT || 3000);
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(expres.urlencoded({ extended: false }));
app.use(bodyParser.json());

var user = require("./routes/usuario.routes");
app.use("/api", user);

// iniciando el servidor
app.listen(app.get("port"), () => {
  // console.log("servidor en el puerto: ", app.get("port"));
});
