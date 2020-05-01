import { ImmerReducer, Subscription, Effect } from 'umi'
import { message } from 'antd'
import { pathToRegexp } from 'path-to-regexp'
import { Tickets, UpdateTicketOption } from '@/interfaces/ticket'
import { getTickets, addTicket, updateTicket } from '@/api/ticket'
import { redirectTo } from '@/utils'

export interface TicketModelState {
  tickets: Tickets,
}

export interface TicketModel {
  state: TicketModelState,
  subscriptions: {
    onTicketPage: Subscription,
  },
  effects: {
    fetchTickets: Effect,
    addTicket: Effect,
    updateTicket: Effect,
  },
  reducers: {
    setTickets: ImmerReducer<TicketModelState, ReturnType<typeof createSetTickets>>,
  },
}

export const createFetchTickets = () => ({ type: 'fetchTickets' })
export const createSetTickets = (tickets: Tickets) => ({
  type: 'setTickets',
  payload: tickets,
})
export const createAddTicket = (name: string, image: string, timePlay: number, location: string, timeOut: number, num: number) => ({
  type: 'ticket/addTicket',
  payload: {
    name,
    image,
    timePlay,
    location,
    timeOut,
    num,
  }
})
export const createUpdateTicket = (updateTicketOption: UpdateTicketOption) => ({
  type: 'ticket/updateTicket',
  payload: updateTicketOption,
})

const ticketModel: TicketModel = {
  state: {
    tickets: [],
  },
  subscriptions: {
    onTicketPage({ history, dispatch }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/ticket').exec(pathname)
        if (match) {
          dispatch(createFetchTickets())
        }
      })
    },
  },
  effects: {
    * fetchTickets(action, { call, put }) {
      const data = yield call(getTickets)
      yield put(createSetTickets(data))
    },
    * addTicket({ payload }, { call }) {
      yield call(addTicket, payload)
      message.success('添加成功')
      redirectTo('/ticket', 2000)
    },
    * updateTicket({ payload }, { call }) {
      yield call(updateTicket, payload)
      message.success('修改成功')
    }
  },
  reducers: {
    setTickets(state, { payload }) {
      state.tickets = payload
    },
  },
}

export default ticketModel
