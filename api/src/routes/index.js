const { Router } = require("express");
// Importar todos los routers;
const videogame = require("./videogame.js");
const videogames = require("./videogames.js");
const genres = require("./genres.js");
const upgenres = require("./upgenres.js");
const platforms = require("./platforms.js");
const router = Router();

// Configurar los routers
router.use("/videogame", videogame);
router.use("/videogames", videogames);
router.use("/genres", genres);
router.use("/upgenres", upgenres);
router.use("/platforms", platforms);

router.get("/", function (req, res, next) {
  console.log("hi desde el index");
});

module.exports = router;
