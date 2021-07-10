const { apiReq } = require("./lib.js");

const { Router } = require("express");
const router = Router();

router.get("/", function (req, res) {
    apiReq("genres", gRes);
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
  console.log(forReturn);
};

module.exports = router;
