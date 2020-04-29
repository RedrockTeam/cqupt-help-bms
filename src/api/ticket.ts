import { API } from './index'
import { GetTicketsResponse, AddTicketResponse, UpdateTicketResponse } from "@/interfaces"
import { AddTicketOption, UpdateTicketOption } from '@/interfaces/ticket'

export const getTickets = (): Promise<GetTicketsResponse> => {
  return fetch(`${API}/cinema/info`).then(r => r.json()).catch(alert)
}

export const addTicket = (addTicketOption: AddTicketOption): Promise<AddTicketResponse> => {
  return fetch(`${API}/cinema/update`, {
    method: 'POST',
    body: JSON.stringify({
      ...addTicketOption,
      operation: 'add',
      id: 0,
    }),
  }).then(r => r.json()).catch(alert)
}

export const updateTicket = (updateTicketOption: UpdateTicketOption): Promise<UpdateTicketResponse> => {
  return fetch(`${API}/cinema/update`, {
    method: 'POST',
    body: JSON.stringify({
      ...updateTicketOption,
      operation: 'update',
    }),
  }).then(r => r.json()).catch(alert) 
}
