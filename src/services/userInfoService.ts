import { BaseService } from './baseService';
import type { IUserInfo } from '../interfaces/UserInterface';

export const UserInfoService = new BaseService<IUserInfo>('users');
