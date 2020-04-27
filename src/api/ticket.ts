import { API } from './index'
import { GetTicketsResponse, AddTicketResponse, UpdateTicketResponse } from "@/interfaces"
import { AddTicketOption } from '@/interfaces/ticket'
import { UpdateActivityOptions } from '@/interfaces/activity'

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

export const updateTicket = (updateTicketOption: UpdateActivityOptions): Promise<UpdateTicketResponse> => {
  return fetch(`${API}/cinema/update`, {
    method: 'POST',
    body: JSON.stringify({
      ...updateTicketOption,
      operation: 'update',
      id: 0,
    }),
  }).then(r => r.json()).catch(alert) 
}
