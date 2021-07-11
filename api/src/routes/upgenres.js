const { Genre } = require('../db.js');
const { apiReq } = require("./lib.js");
const { Router } = require("express");
const router = Router();

router.get("/", function (req, res) {
    apiReq("genres", gRes)
      res.send('ok');}
    );

const gRes = (body) => {
  let gnr = [];
  body.results.forEach((e) => {
    let a = {
      id: e.id,
      name: e.name,
      img: e.image_background,
    };
    gnr.push(a);
  });
  Genre.sync({ force: true }).then(()=>{
    gnr.forEach((g)=>{Genre.create(g);});
});
};

module.exports = router;

