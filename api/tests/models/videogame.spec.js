const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should throw an error if id is null', () => {
        Videogame.create({name:"test"})
          .then(() => done(new Error('It requires a valid id')))
          .catch(() => done());
      });
      it('should throw an error if description is null', () => {
        Videogame.create({name:"test", id:"B10"})
          .then(() => done(new Error('It requires a valid description')))
          .catch(() => done());
      });
      it('should throw an error if platforms is null', () => {
        Videogame.create({name:"test", id:"B10", description:"blabla"})
          .then(() => done(new Error('It requires valid platforms')))
          .catch(() => done());
      });
      it('should work when has valid keys', () => {
        Videogame.create({name:"test", id:"B11", description:"blabla", platforms:["PS3"]})
      });
    });
  });
});
