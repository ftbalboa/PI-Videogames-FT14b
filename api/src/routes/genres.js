const { Genre} = require('../db.js');
const { Router } = require("express");
const router = Router();



router.get("/", function (req, res) {
    Genre.findAll().then((i)=>{res.send(i);})
});

const gRes = (body) => {
  let forReturn = [];
  body.results.forEach((e) => {
    let a = {
      id: e.id,
      name: e.name,
      img: e.image_background,
    };
    forReturn.push(a);
  });
};

module.exports = router;
