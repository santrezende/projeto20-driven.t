import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { createNewTicket, getTicketsType, getUserTickets } from '@/controllers/tickets-controller';

const ticketsRouter = Router();

ticketsRouter
  .post('/', authenticateToken, createNewTicket)
  .get('/', authenticateToken, getUserTickets)
  .get('/types', authenticateToken, getTicketsType);

export { ticketsRouter };
