/* tslint:disable:only-arrow-functions */

import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /api/v1/heroes', () => {
  it('responds with JSON array', () => {
    return chai.request(app).get('/api/v1/heroes').then(res => {
      expect(res.status).to.equal(200);
      // tslint:disable-next-line
      expect(res).be.json;
      expect(res.body).be.an('array');
      expect(res.body).to.have.length(5);
    });
  });

  it('should include Wolverine', () => {
    return chai.request(app).get('/api/v1/heroes').then(res => {
      const wolverine = res.body.find((hero: any) => hero.name === 'Wolverine');
      // tslint:disable-next-line
      expect(wolverine).to.exist;
      expect(wolverine).to.have.all.keys([
        'id',
        'name',
        'aliases',
        'occupation',
        'gender',
        'height',
        'hair',
        'eyes',
        'powers',
      ]);
    });
  });

  describe('GET /api/v1/heroes/:id', () => {
    it('responds with single JSON object', () => {
      return chai.request(app).get('/api/v1/heroes/1').then(res => {
        expect(res.status).to.equal(200);
        // tslint:disable-next-line
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      });
    });

    it('should return Luke Cage', () => {
      return chai.request(app).get('/api/v1/heroes/1').then(res => {
        expect(res.body.hero.name).to.equal('Luke Cage');
      });
    });
  });
});
