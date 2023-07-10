import { notFoundError, conflictError, unauthorizedError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import paymentsRepository from '@/repositories/payments-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import { CardData } from '@/schemas';

async function postPayment(ticketId: number, cardData: CardData, userId: number) {
  const validateTicket = await ticketsRepository.getTicketById(ticketId);

  if (!validateTicket) {
    throw notFoundError();
  }

  const enrollmentId = await enrollmentRepository.getEnrollmentId(userId);
  const ticket = await ticketsRepository.getTicketWithPrice(enrollmentId);

  if (!ticket[0]) {
    throw conflictError('No ticket reserved');
  }

  if (ticket[0].status === 'PAID') {
    throw conflictError('Ticket already paid');
  }

  const data = {
    ticketId: ticket[0].id,
    value: ticket[0].TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: String(cardData.number).slice(-4),
  };

  const newPayment = await paymentsRepository.postTicket(data);
  ticketsRepository.updatePaidTicket(ticket[0].id);

  return newPayment;
}

async function getPayment(ticketId: string, userId: number) {
  if (!ticketId) {
    throw conflictError('send the ticketId with queryparams');
  }

  const validateTicket = await ticketsRepository.getTicketWithUserId(ticketId);

  if (!validateTicket) {
    throw notFoundError();
  }

  if (validateTicket.Enrollment.userId !== userId) {
    throw unauthorizedError();
  }

  return await paymentsRepository.getPayments(ticketId);
}

const paymentsService = {
  postPayment,
  getPayment,
};

export default paymentsService;
