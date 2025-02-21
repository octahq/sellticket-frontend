import { TicketPayment } from "./enums/TicketPayment";

 export type TicketType = {
  type: string;
  payment: TicketPayment;
  price: number;
}

export default interface Event {
  id: number;
  name: string;
  ticketsSold: number;
  unitsLeft: number;
  ticketTypes: TicketType[]
  hosts: {
    name: string;
    avatar: any;
  }[];
  location: string;
  date: string;
  address: string;
  description: string;
}
