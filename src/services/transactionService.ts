import { BaseService } from './baseService';
import type { ITransaction } from '../interfaces/UserInterface';

export const TransactionService = new BaseService<ITransaction>('transactions');
