import type { ITransaction } from '../interfaces/UserInterface';
import { faker } from '@faker-js/faker';
import type { EntitySchema } from './dataGenerator';

export const TransactionSchema: EntitySchema<ITransaction> = {
    id: () => faker.string.uuid(), 
	userId: () => faker.string.alphanumeric(),
	recipientId: () => faker.string.alphanumeric(),
	dealId: () => faker.string.alphanumeric(), 
	type: () => faker.helpers.arrayElement(["Deposit" , "Withdrawal" , "Income" , "Escrow"]),
	transactionType: () => faker.helpers.arrayElement(["Credit", "Debit"]),
	amount: () => faker.number.int({min: 4500, max:5000000}),
	status: () => faker.helpers.arrayElement(["Pending" , "Completed" , "Failed"]),
	description: () => faker.lorem.words({min: 1, max: 6}),
	createdAt: () => faker.date.recent().toISOString()
}