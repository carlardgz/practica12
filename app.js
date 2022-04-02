var express = require("express"); //importamos dependencia
var app = express(); //declaramos una App de Express

var port = process.env.port || 3000; /*setteamos el puerto
para que escuche el servidor*/

app.set("view engine", "ejs"); //setteamos el ejs

app.use(
  "/assets",
  express.static(__dirname + "/public")
); /*Esta línea le especifica a la aplicación de express que el directorio virtual
para el contenido estático se llama “/assets” y que ese nombre será mapeado a una 
carpeta física “/public”, que se encuentra en el directorio donde corre 
la aplicación “__dirname” */

app.use("/", function (req, res, next) {
  console.log("Request URL:" + req.url);
  next();
});

//primera ruta (está al nivel de la raíz /), Hello World!
app.get("/", function (req, res) {
  res.render("index");
});

app.listen(port); //levantar el server y ponerlo a la escucha

//segunda ruta /api, regresa un objeto JSON
app.get("/api", function (req, res) {
  res.json({ firstname: "Carla", lastname: "Rodríguez" });
});

/*tercera ruta, enviamos un parámetro a nuestro server utilizando la barra de
direcciones del navegador*/
app.get("/person/:id", function (req, res) {
  res.render("person", { ID: req.params.id });
});
