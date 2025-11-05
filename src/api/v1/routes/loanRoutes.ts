import { approveLoan, createLoan, getLoans, reviewLoan } from "../controllers/loanController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
const express = require('express');
const router = express.Router();

router.post('/', authenticate, isAuthorized({ hasRole: ["admin", "manager","user"] }),createLoan);
router.put('/:id/review',
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true }), reviewLoan);
router.get('/',authenticate, getLoans);
router.put('/:id/approve',
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true }), approveLoan);

export default router
