export interface Ticket {
  id: number;
  image: string;
  name: string;
  username: string;
  time_play: number;
  location: string;
  time_out: number;
  num: number;
}

export type Tickets = Ticket[];

export interface AddTicketOption {
  name: string;
  image: string;
  time_play: number;
  location: string;
  time_out: number;
  num: number;
}

export interface UpdateTicketOption extends AddTicketOption {
  id: number;
}
