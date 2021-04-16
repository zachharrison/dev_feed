import axios from 'axios';
import {
  GET_CONVERSATIONS,
  GET_CONVERSATION,
  MESSENGER_ERROR,
} from './constants';

// GET CONVERSATIONS
export const getConversations = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/messages/conversations/');

    dispatch({
      type: GET_CONVERSATIONS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: MESSENGER_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
