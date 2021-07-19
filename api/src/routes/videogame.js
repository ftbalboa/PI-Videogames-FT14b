const {Router} = require("express");
const router = Router();
const { apiReq } = require("./lib.js");
const { Videogame } = require('../db.js');

let actId = 0;

Videogame.findAll().then(
  (i)=>{i.forEach( (e) => {
    let id = e.dataValues.id;
    id = id.replace("B", "");
    id = Number(id);
    if (id >= actId) {actId = id + 1;}
  });})

router.post("/", function (req, res) {
  let rB = req.body;
  const game = {
    ...rB,
    id: `B${actId}`,
  };
  actId++;
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
    if(req.params.idVideogame.includes("B")){
      Videogame.findOne({ where: {id: req.params.idVideogame} }).then(function(one) {
        res.send(one);
      })
    }
    else{apiReq("games", cb, req.params.idVideogame);}
});

module.exports = router;
