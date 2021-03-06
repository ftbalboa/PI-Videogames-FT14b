const { Router } = require("express");
const router = Router();
const { apiReq, simpleReq } = require("./lib.js");
const apiCalls = 3;
const { Videogame, Genre } = require("../db.js");

router.get("/", function (req, res) {
  let finalSend = [];
  let actCalls = 0;
  // callback function
  const cb = (b) => {
    actCalls++;
    const forSend = b.results.map((g) => ({
      id: g.id,
      name: g.name,
      img: g.background_image,
      rating: g.rating,
      genres: g.genres.map((g) => g.name),
      released: g.released,
    }));
    finalSend = [...finalSend, ...forSend];
    if (actCalls === apiCalls) {
      Videogame.findAll({include:Genre}).then((i) => {
        i = i.map((v) => ({...v.dataValues, genres: v.dataValues.Genres.map((g)=>(g.name))}));
        let forSend = [];
        if (req.query.name) {
          forSend = i.filter((v)=>v.name.includes(req.query.name));
        } else {
          forSend = i;
        }
        finalSend = [...finalSend, ...forSend];
        res.send(finalSend);
      });
    } else {
      simpleReq(b.next, cb);
    }
  };
  //handle query
  req.query.name
    ? apiReq("games", cb, null, { page_size: 40, search: req.query.name })
    : apiReq("games", cb, null, { page_size: 40 });
});

module.exports = router;
