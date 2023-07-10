import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function getTicketsType(req: AuthenticatedRequest, res: Response) {
  try {
    const response = await ticketsService.getTicketTypes();
    res.status(httpStatus.OK).send(response);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

export async function createNewTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body;
  const userId = req.userId;
  try {
    const newTicket = await ticketsService.postNewTicket(ticketTypeId, userId);
    res.status(httpStatus.CREATED).send(newTicket);
  } catch (error) {
    if (error.name === 'InvalidDataError') {
      return res.status(httpStatus.BAD_REQUEST).send(error.details);
    }
    if (error.name === 'ConflictError') {
      return res.status(httpStatus.CONFLICT).send(error.message);
    }
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send('You do not have an enrollment yet');
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

export async function getUserTickets(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  try {
    const ticket = await ticketsService.getUserTickets(userId);
    res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}
