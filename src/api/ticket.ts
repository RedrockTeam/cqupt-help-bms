import { request } from 'umi'
import { AddTicketOption, UpdateTicketOption, Tickets } from '@/interfaces/ticket'

export const getTickets = (): Promise<Tickets> => {
  return request(`/cinema/info`)
}

export const addTicket = (addTicketOption: AddTicketOption): Promise<null> => {
  return request(`/cinema/update`, {
    method: 'POST',
    body: JSON.stringify({
      ...addTicketOption,
      operation: 'add',
      id: 0,
    }),
  })
}

export const updateTicket = (updateTicketOption: UpdateTicketOption): Promise<null> => {
  return request(`/cinema/update`, {
    method: 'POST',
    body: JSON.stringify({
      ...updateTicketOption,
      operation: 'update',
    }),
  }) 
}
