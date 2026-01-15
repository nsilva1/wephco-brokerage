import type { ILeads } from "../interfaces/UserInterface";
import { faker } from '@faker-js/faker';
import type { EntitySchema } from './dataGenerator';

export const LeadSchema: EntitySchema<ILeads> = {
  id: () => faker.string.uuid(),
  name: () => faker.person.fullName(),
  email: () => faker.internet.email(),
  phone: () => faker.phone.number(),
  propertyId: () => `PROP-${faker.string.alphanumeric(5).toUpperCase()}`,
  budget: () => faker.number.int({ min: 10000, max: 500000 }),
  source: () => faker.helpers.arrayElement(['WhatsApp', 'Referral', 'Instagram', 'Facebook', 'Website']),
  createdAt: () => faker.date.recent().toISOString(),
};