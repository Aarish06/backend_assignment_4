// src/api/v1/controllers/loanController.ts
import { Request, Response } from 'express';

let loans = [
  { id: 1, user: 'Aarish', amount: 4500, status: 'pending' },
  { id: 2, user: 'Bachi', amount: 6900, status: 'pending' }
];

// POST /api/v1/loans (user)
export const createLoan = (req: Request, res: Response) => {
  const newLoan = {
    id: loans.length + 1,
    user: req.body.user || 'Unknown',
    amount: req.body.amount || 0,
    status: 'pending'
  };
  loans.push(newLoan);
  res.json({ message: 'Loan created', loan: newLoan });
};

// PUT /api/v1/loans/:id/review (officer)
export const reviewLoan = (req: Request, res: Response) => {
  const loan = loans.find(l => l.id === Number(req.params.id));
  if (!loan) return res.status(404).json({ message: 'Loan not found' });
  loan.status = 'reviewed';
  res.json({ message: `Loan ${loan.id} reviewed`, loan });
};

export const getLoans = (_req: Request, res: Response) => {
  res.json({ loans });
};

export const approveLoan = (req: Request, res: Response) => {
  const loan = loans.find(l => l.id === Number(req.params.id));
  if (!loan) return res.status(404).json({ message: 'Loan not found' });
  loan.status = 'approved';
  res.json({ message: `Loan ${loan.id} approved`, loan });
};
