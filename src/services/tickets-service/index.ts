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

  const existingTicket = await ticketsRepository.getTicket(enrollmentId);

  if (existingTicket[0]) {
    throw invalidDataError(['You can get only one Ticket']);
  }

  const validateTicket = await ticketsRepository.getTicket(enrollmentId);

  if (validateTicket[0]) {
    throw conflictError('You already have a reserved or paid ticket');
  }

  const newTicket = await ticketsRepository.postTicket(ticketType.id, enrollmentId);

  return {
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
}

async function getUserTickets(userId: number) {
  const enrollmentId = await enrollmentRepository.getEnrollmentId(userId);

  if (!enrollmentId) {
    throw notFoundError();
  }

  const ticket = await ticketsRepository.getTicket(enrollmentId);

  if (!ticket[0]) {
    throw notFoundError();
  }

  const ticketType = await ticketsRepository.getTicketType(ticket[0].ticketTypeId);

  return {
    id: ticket[0].id,
    status: ticket[0].status,
    ticketTypeId: ticket[0].ticketTypeId,
    enrollmentId: ticket[0].enrollmentId,
    TicketType: {
      id: ticketType.id,
      name: ticketType.name,
      price: ticketType.price,
      isRemote: ticketType.isRemote,
      includesHotel: ticketType.includesHotel,
      createdAt: ticketType.createdAt,
      updatedAt: ticketType.updatedAt,
    },
    createdAt: ticket[0].createdAt,
    updatedAt: ticket[0].updatedAt,
  };
}

const ticketsService = {
  getTicketTypes,
  postNewTicket,
  getUserTickets,
};

export default ticketsService;
