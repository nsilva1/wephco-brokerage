import { BaseService } from "./baseService";
import type { IProperty } from "../interfaces/UserInterface";

export const PropertyService = new BaseService<IProperty>('properties');
