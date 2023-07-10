import dayjs from 'dayjs';
import { prisma } from '@/config';

function getAllTicketTypes() {
  return prisma.ticketType.findMany();
}

function getTicketType(id: number) {
  return prisma.ticketType.findFirst({
    where: {
      id,
    },
  });
}

async function postTicket(ticketTypeId: number, enrollmentId: number) {
  return prisma.ticket.create({
    data: {
      status: 'RESERVED',
      ticketTypeId: ticketTypeId,
      enrollmentId: enrollmentId,
      createdAt: dayjs().toDate(),
      updatedAt: dayjs().toDate(),
    },
  });
}

async function getTicket(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
  });
}

const ticketsRepository = {
  getAllTicketTypes,
  getTicketType,
  postTicket,
  getTicket,
};

export default ticketsRepository;
