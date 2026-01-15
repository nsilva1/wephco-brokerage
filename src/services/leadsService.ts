import { BaseService } from "./baseService";
import type { ILeads } from "../interfaces/UserInterface";

export const LeadsService = new BaseService<ILeads>('leads');
