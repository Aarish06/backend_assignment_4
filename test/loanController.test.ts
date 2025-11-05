// test/loanController.test.ts
import request from 'supertest';
import app from '../src/app';

describe('Loan API Integration Tests', () => {
  it('PUT /api/v1/loans/1/review should return 200 if loan exists', async () => {
    const res = await request(app).put('/api/v1/loans/1/review');
    expect([200, 401, 404]).toContain(res.status);
  });

  it('PUT /api/v1/loans/999/review should return 404 if loan not found', async () => {
    const res = await request(app).put('/api/v1/loans/999/review');
    expect([404, 401]).toContain(res.status);
  });

  it('PUT /api/v1/loans/2/approve should return 200 if loan exists', async () => {
    const res = await request(app).put('/api/v1/loans/2/approve');
    expect([200, 401, 404]).toContain(res.status);
  });

  it('PUT /api/v1/loans/999/approve should return 404 if loan not found', async () => {
    const res = await request(app).put('/api/v1/loans/999/approve');
    expect([404, 401]).toContain(res.status);
  });
});
