import Joi from 'joi';

type NewPayment = {
  ticketId: number;
  cardData: {
    issuer: string;
    number: number;
    name: string;
    expirationDate: string;
    cvv: string;
  };
};

export type CardData = {
  issuer: string;
  number: number;
  name: string;
  expirationDate: string;
  cvv: string;
};

export type CardDataRepo = {
  ticketId: number;
  value: number;
  cardIssuer: string;
  cardLastDigits: string;
};

export const newPaymentSchema = Joi.object<NewPayment>({
  ticketId: Joi.number().required(),
  cardData: Joi.object({
    issuer: Joi.string().valid('MASTERCARD', 'VISA').required(),
    number: Joi.string().creditCard().required(),
    name: Joi.string().required(),
    expirationDate: Joi.date().required(),
    cvv: Joi.string()
      .regex(/^\d{3}$/)
      .required(),
  }).required(),
});
