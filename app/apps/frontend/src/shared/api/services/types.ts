import { HttpStatus } from "./httpStatus";
import { RequestMethod } from "./requestMethod.enum";

export interface Device {
  buildVersion: string;
  os: string;
  id: string;
  osVersion: string;
  name: string;
}

export interface Stat {
  id: number;
  device: Device;
  url: string;
  method: RequestMethod;
  statusCode: HttpStatus;
  date: number;
  duration: number;
  size: number;
  locationOfRequest: string;
}
