const {Router} = require("express");
const router = Router();

router.get("/", function (req, res) {
  console.log("hi desde videogame");
});

module.exports = router;
