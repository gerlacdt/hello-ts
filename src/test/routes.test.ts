import * as chai from 'chai';
import * as request from 'supertest';
import { app } from '../App';

const expect = chai.expect;

describe('routes', () => {
  it('fib route', async () => {
    const response = await request(app)
      .get('/fib')
      .query({ n: 5 })
      .expect(200);
    const body = response.body;
    expect(body.result).to.be.equal(5);
  });

  it('error fib route', async () => {
    const response = await request(app)
      .get('/fib')
      .query({ n: 'foobar' })
      .expect(500);
    const body = response.body;

    expect(body.err).be.equal('Not a number');
  });
});
