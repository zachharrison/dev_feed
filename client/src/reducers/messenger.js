import { GET_CONVERSATIONS, GET_CONVERSATION } from '../actions/constants';

const initialState = {
  conversations: [],
  conversation: null,
  loading: true,
  error: {},
};

export default function messengerReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
}
