require('dotenv').config();
const request = require("request");
const url = "https://api.rawg.io/api/";
const { API_KEY } = process.env;

// for requests, need path and id or params
const apiReq = (path, cb, id = null, params = {}) => {
  id = id ? `/${id}` : "";
  paramStr = "";
  Object.keys(params).forEach((key) => {
    paramStr = paramStr.concat(`&${key}=${params[key]}`);
  });
  let requestOptions = {
    url: `${url}${path}${id}?key=${API_KEY}${paramStr}`,
    method: "GET",
    json: {},
  };
  request(requestOptions, (err, response, body) => {
    if (err) {
      console.log(err);
    } else if (response.statusCode === 200) {
      cb(body);
    } else {
      console.log(response.statusCode);
    }
  });
};

module.exports = { apiReq };
