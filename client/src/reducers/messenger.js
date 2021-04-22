import {
  GET_CONVERSATIONS,
  GET_CONVERSATION,
  NEW_MESSAGE,
  MESSENGER_ERROR,
  CLEAR_MESSENGER,
  NEW_CONVERSATION,
} from '../actions/constants';

const initialState = {
  conversations: [],
  conversation: [],
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
    case NEW_MESSAGE:
      return {
        ...state,
        conversation: [...state.conversation, payload],
        loading: false,
      };
    case NEW_CONVERSATION:
      return {
        ...state,
        conversations: [...state.conversations, payload],
        loading: false,
      };
    case CLEAR_MESSENGER:
      return {
        ...state,
        conversation: [],
        conversations: [],
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
