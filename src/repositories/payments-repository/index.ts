import dayjs from 'dayjs';
import { prisma } from '@/config';
import { CardDataRepo } from '@/schemas';

async function postTicket(data: CardDataRepo) {
  return prisma.payment.create({
    data: {
      ticketId: data.ticketId,
      value: data.value,
      cardIssuer: data.cardIssuer,
      cardLastDigits: data.cardLastDigits,
      createdAt: dayjs().toDate(),
      updatedAt: dayjs().toDate(),
    },
  });
}

const paymentsRepository = {
  postTicket,
};

export default paymentsRepository;
