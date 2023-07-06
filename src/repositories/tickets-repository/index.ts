import { prisma } from '@/config';

async function getAllTicketTypes() {
  return await prisma.ticketType.findMany();
}

const ticketsRepository = {
  getAllTicketTypes,
};

export default ticketsRepository;
