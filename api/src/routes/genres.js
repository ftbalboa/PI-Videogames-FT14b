const { Genre} = require('../db.js');
const { Router } = require("express");
const { apiReq } = require("./lib.js");
const router = Router();

Genre.findAll().then((i)=>{if(i.length < 1){
  apiReq("genres", gRes)
}})

router.get("/", function (req, res) {
    Genre.findAll().then((i)=>{res.send(i);})
});

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
