import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createNewTicket, getTicketsType, getUserTickets } from '@/controllers/tickets-controller';
import { newTicketSchema } from '@/schemas';

const ticketsRouter = Router();

ticketsRouter
  .post('/', authenticateToken, validateBody(newTicketSchema), createNewTicket)
  .get('/', authenticateToken, getUserTickets)
  .get('/types', authenticateToken, getTicketsType);

export { ticketsRouter };
