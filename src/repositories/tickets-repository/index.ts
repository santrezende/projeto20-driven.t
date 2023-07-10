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
  return prisma.ticket.findMany({
    where: {
      enrollmentId,
    },
  });
}

async function getTicketById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
  });
}

async function getTicketWithPrice(enrollmentId: number) {
  return prisma.ticket.findMany({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: {
        select: {
          price: true,
        },
      },
    },
  });
}

async function updatePaidTicket(id: number) {
  return prisma.ticket.update({
    where: {
      id,
    },
    data: {
      status: 'PAID',
      updatedAt: dayjs().toDate(),
    },
  });
}

const ticketsRepository = {
  getAllTicketTypes,
  getTicketType,
  postTicket,
  getTicket,
  getTicketById,
  getTicketWithPrice,
  updatePaidTicket,
};

export default ticketsRepository;
