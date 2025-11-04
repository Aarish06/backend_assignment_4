const express = require('express');
import { approveLoan, createLoan, getLoans, reviewLoan } from "../controllers/loanController";

const router = express.Router();

router.post('/', createLoan);
router.put('/:id/review', reviewLoan);
router.get('/', getLoans);
router.put('/:id/approve', approveLoan);

export default router
