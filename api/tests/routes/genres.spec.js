/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");

const request = require("supertest");


describe("Genres route", () => {
  it("should get 200", (done) => {
    request(app).get("/genres").expect(200, done);
  });
  it("should get json", (done) => {
    request(app).get("/genres").expect("Content-Type", /json/, done);
  });
  it("should get an array", (done) => {
    request(app)
      .get("/genres")
      .end(function (err, res) {
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf.above(10);
        done();
      });
  });
  it("check genres keys", (done) => {
    request(app)
      .get("/genres")
      .end(function (err, res) {
        expect(res.body[0].id).to.exist;
        expect(res.body[0].name).to.exist;
        expect(res.body[0].img).to.exist;
        done();
      });
  });
});
