const { Router } = require("express");
const router = Router();
const { apiReq } = require("./lib.js");

router.get("/", function (req, res) {
  // callback function
  const cb = (b) => {
    const forSend = b.results.map((p) => ({
        name: p.name
      }));
    res.send(forSend);
  };
  //handle query
    apiReq("platforms", cb);
});

module.exports = router;
