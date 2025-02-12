export default interface Event {
  id: number;
  name: string;
  ticketsSold: number;
  unitsLeft: number;
  hosts: {
    name: string;
    avatar: any;
  }[];
  location: string;
  date: string;
  address: string;
  description: string
}
