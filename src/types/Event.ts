export default interface Event {
  name: string;
  ticketsSold: number;
  hosts: {
    name: string;
    avatar: any;
  }[];
}
