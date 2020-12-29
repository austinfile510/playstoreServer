const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../app");

describe('GET /apps', () => {
    it('should return an array of apps', () => {
        return supertest(app)
        .get('/apps')
        .expect(200)
        .expect('Content-Type',/json/)
        .then((res) => {
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf.at.least(1);
            const apps = res.body[0];
            expect(apps).to.include.all.keys(
              "Category",
              "Rating",
              "App",
              "Genres"
            );
          });
      });

      it('should be 400 if sort is incorrect', () => {
        return supertest(app)
          .get('/apps')
          .query({ sort: 'MISTAKE' })
          .expect(400, 'Sort must be one of rating or app');
      });

      it('should sort by rating', () => {
        return supertest(app)
          .get('/apps')
          .query({ sort: 'Rating' })
          .expect(200)
          .expect('Content-Type', /json/)
          .then(res => {
            expect(res.body).to.be.an('array');
            let sorted = true;
    
            let i = 0;
          
            while (i < res.body.length - 1) {
              const appAtI = res.body[i];
              const appAtIPlus1 = res.body[i + 1];
              if (appAtIPlus1.Rating < appAtI.Rating) {
                sorted = false;
                break;
              }
              i++;
            }
            expect(sorted).to.be.true;
          });
        });

});