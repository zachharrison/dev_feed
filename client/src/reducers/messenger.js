import {
  GET_CONVERSATIONS,
  GET_CONVERSATION,
  MESSENGER_ERROR,
} from '../actions/constants';

const initialState = {
  conversations: [],
  conversation: null,
  loading: true,
  error: {},
};

export default function messengerReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CONVERSATIONS:
      return {
        ...state,
        conversations: payload,
        loading: false,
      };
    case GET_CONVERSATION:
      return {
        ...state,
        conversation: payload,
        loading: false,
      };
    case MESSENGER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
