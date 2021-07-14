const { Router } = require("express");
const router = Router();
const { apiReq } = require("./lib.js");

router.get("/", function (req, res) {
  // callback function
  const cb = (b) => {
    const forSend = b.results.map((g) => ({
      id: g.id,
      name: g.name,
      img: g.background_image,
      genres: g.genres.map((g) => g.name),
    }));
    res.send(forSend);
  };
  //handle query
  req.query.name
    ? apiReq("games", cb, null, { page_size: 15, search: req.query.name })
    : apiReq("games", cb, null, { page_size: 15 });
});

module.exports = router;
