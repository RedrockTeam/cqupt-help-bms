import { ImmerReducer, Subscription, Effect } from 'umi'
import { pathToRegexp } from 'path-to-regexp'
import { Tickets, UpdateTicketOption } from '@/interfaces/ticket'
import { getTickets, addTicket, updateTicket } from '@/api/ticket'
import { createErrorMessage, createSuccessMessage } from './layout'
import { createFetchError } from '@/utils'

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
      const res = yield call(getTickets)
      if (res.status === 10000) {
        yield put(createSetTickets(res.data))
      } else {
        yield put(createErrorMessage(createFetchError('activity/fetchActivityGifts/getActivityGifts', res.status, res.info)))
      }
    },
    * addTicket({ payload }, { call, put }) {
      const res = yield call(addTicket, payload)
      if (res.status === 10000) {
        yield put(createSuccessMessage('添加成功'))
        setTimeout(() => window.location.pathname = '/ticket', 2000)
      } else {
        yield put(createErrorMessage(createFetchError('activity/addTicket/addTicket', res.status, res.info)))
      }
    },
    * updateTicket({ payload }, { call, put }) {
      const res = yield call(updateTicket, payload)
      if (res.status === 10000) {
        yield put(createSuccessMessage('修改成功'))
      } else {
        yield put(createErrorMessage(createFetchError('activity/updateTicket/updateTicket', res.status, res.info)))
      }
    }
  },
  reducers: {
    setTickets(state, { payload }) {
      state.tickets = payload
    },
  },
}

export default ticketModel
