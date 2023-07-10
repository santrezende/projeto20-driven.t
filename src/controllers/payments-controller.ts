import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';
import { CardData } from '@/schemas';

export async function checkOut(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const { ticketId }: { ticketId: number } = req.body;
  const { cardData }: { cardData: CardData } = req.body;
  try {
    const newPayment = await paymentsService.postPayment(ticketId, cardData, userId);
    res.send(newPayment).status(httpStatus.OK);
  } catch (error) {
    if (error.name === 'ConflictError') {
      return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query as Record<string, string>;
  const userId = req.userId;
  try {
    const payment = await paymentsService.getPayment(ticketId, userId);
    res.send(payment).status(httpStatus.OK);
  } catch (error) {
    if (error.name === 'ConflictError') {
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
