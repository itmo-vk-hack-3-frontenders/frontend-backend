import { HttpStatus } from "./httpStatus.enum";
import { RequestMethod } from "./requestMethod.enum";

export interface Stat {
  url: string;
  method: RequestMethod;
  statusCode: HttpStatus;
  date: number;
  duration: number;
  size: number;
  locationOfRequest: string;
}

export interface Device {
  buildVersion: string;
  os: string;
  deviceId: string;
  osVersion: string;
}
