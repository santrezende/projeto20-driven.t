import Joi from 'joi';

type NewTicket = {
  ticketTypeId: number;
};

export const newTicketSchema = Joi.object<NewTicket>({
  ticketTypeId: Joi.number().required(),
});
