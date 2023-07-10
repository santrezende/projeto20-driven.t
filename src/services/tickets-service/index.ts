import { invalidDataError, notFoundError, conflictError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getTicketTypes() {
  const ticketTypes = await ticketsRepository.getAllTicketTypes();
  return ticketTypes;
}

async function postNewTicket(ticketId: number, userId: number) {
  const ticketType = await ticketsRepository.getTicketType(ticketId);

  if (!ticketType) {
    throw invalidDataError(['There is no ticket type for this id']);
  }

  const enrollmentId = await enrollmentRepository.getEnrollmentId(userId);

  if (!enrollmentId) {
    throw notFoundError();
  }

  const validateTicket = await ticketsRepository.getTicket(enrollmentId);

  if (validateTicket) {
    throw conflictError('You already have a reserved or paid ticket');
  }

  const newTicket = await ticketsRepository.postTicket(ticketType.id, enrollmentId);

  const response = {
    id: newTicket.id,
    status: newTicket.status,
    ticketTypeId: newTicket.ticketTypeId,
    enrollmentId: newTicket.enrollmentId,
    TicketType: {
      id: ticketType.id,
      name: ticketType.name,
      price: ticketType.price,
      isRemote: ticketType.isRemote,
      includesHotel: ticketType.includesHotel,
      createdAt: ticketType.createdAt,
      updatedAt: ticketType.updatedAt,
    },
    createdAt: newTicket.createdAt,
    updatedAt: newTicket.updatedAt,
  };

  return response;
}

const ticketsService = {
  getTicketTypes,
  postNewTicket,
};

export default ticketsService;
