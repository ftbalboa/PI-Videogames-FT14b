const {Router} = require("express");
const router = Router();
const { apiReq } = require("./lib.js");
const { Videogame } = require('../db.js');


router.post("/posts", function (req, res) {
  let rB = req.body;
  const base = {
    id: "0",
    name: "",
    description: "",
    released:"",
    rating:"",
    platforms:[],
  };
  let game = { ...base };
  for (key of Object.keys(base)) {
    if (rB.hasOwnProperty(key)) game[key] = rB[key];
  }
  Videogame.sync().then(()=>{
    Videogame.create(game);
    res.status(200).json(game);
});
});

router.get("/:idVideogame", function (req, res) {
    // callback function
    const cb = (b) => {
      const forSend = {
        id: b.id,
        name: b.name,
        img: b.background_image,
        genres: b.genres.map((g) => g.name),
        description: b.description,
        released: b.released,
        rating: b.rating,
        platforms: b.platforms.map((p) => p.platform.name),
      };
      res.send(forSend);
    };
    apiReq("games", cb, req.params.idVideogame);
});

module.exports = router;
