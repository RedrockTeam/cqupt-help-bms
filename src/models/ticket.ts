import { ImmerReducer, Subscription, Effect } from 'umi';
import { message } from 'antd';
import { pathToRegexp } from 'path-to-regexp';
import {
  Tickets,
  UpdateTicketOption,
  AddTicketOption,
} from '@/interfaces/ticket';
import { getTickets, addTicket, updateTicket } from '@/api/ticket';
import { redirectTo } from '@/utils';

export interface TicketModelState {
  tickets: Tickets;
}

export interface TicketModel {
  state: TicketModelState;
  subscriptions: {
    onTicketPage: Subscription;
  };
  effects: {
    fetchTickets: Effect;
    addTicket: Effect;
    updateTicket: Effect;
  };
  reducers: {
    setTickets: ImmerReducer<
      TicketModelState,
      ReturnType<typeof createSetTickets>
    >;
  };
}

export const createFetchTickets = () => ({ type: 'fetchTickets' });
export const createSetTickets = (tickets: Tickets) => ({
  type: 'setTickets',
  payload: tickets,
});
export const createAddTicket = (addTicketOption: AddTicketOption) => ({
  type: 'ticket/addTicket',
  payload: addTicketOption,
});
export const createUpdateTicket = (updateTicketOption: UpdateTicketOption) => ({
  type: 'ticket/updateTicket',
  payload: updateTicketOption,
});

const ticketModel: TicketModel = {
  state: {
    tickets: [],
  },
  subscriptions: {
    onTicketPage({ history, dispatch }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/ticket').exec(pathname);
        if (match) {
          dispatch(createFetchTickets());
        }
      });
    },
  },
  effects: {
    *fetchTickets(action, { call, put }) {
      const res = yield call(getTickets);
      if (res.status === 10000) {
        yield put(createSetTickets(res.data ?? []));
      }
    },
    *addTicket({ payload }, { call }) {
      const res = yield call(addTicket, payload);
      if (res.status === 10000) {
        message.success('添加成功');
        redirectTo('/ticket', 2000);
      }
    },
    *updateTicket({ payload }, { call }) {
      const res = yield call(updateTicket, payload);
      if (res.status === 10000) {
        message.success('修改成功');
      }
    },
  },
  reducers: {
    setTickets(state, { payload }) {
      state.tickets = payload;
    },
  },
};

export default ticketModel;
