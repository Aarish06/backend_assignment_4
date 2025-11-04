import request from 'supertest';
import app from '../src/app';

describe('Loan API Integration Tests', () => {
  it('GET /api/v1/loans should return all loans', async () => {
    const res = await request(app).get('/api/v1/loans');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.loans)).toBe(true);
  });

  it('PUT /api/v1/loans/:id/review should review an existing loan', async () => {
    const res = await request(app).put('/api/v1/loans/1/review');
    expect(res.status).toBe(200);
    expect(res.body.loan.status).toBe('reviewed');
  });

  it('PUT /api/v1/loans/:id/review should return 404 if not found', async () => {
    const res = await request(app).put('/api/v1/loans/999/review');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Loan not found');
  });

  it('PUT /api/v1/loans/:id/approve should approve a loan', async () => {
    const res = await request(app).put('/api/v1/loans/2/approve');
    expect(res.status).toBe(200);
    expect(res.body.loan.status).toBe('approved');
  });

  it('PUT /api/v1/loans/:id/approve should return 404 if not found', async () => {
    const res = await request(app).put('/api/v1/loans/999/approve');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Loan not found');
  });
});
