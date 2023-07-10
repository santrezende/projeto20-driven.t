import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { newPaymentSchema } from '@/schemas';
import { checkOut, getPayment } from '@/controllers/payments-controller';

const paymentsRouter = Router();

paymentsRouter
  .post('/process', authenticateToken, validateBody(newPaymentSchema), checkOut)
  .get('/', authenticateToken, getPayment);

export { paymentsRouter };
