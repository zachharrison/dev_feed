import {
  GET_CONVERSATIONS,
  GET_CONVERSATION,
  NEW_MESSAGE,
  MESSENGER_ERROR,
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
