import axios from 'axios';
import {
  GET_CONVERSATIONS,
  GET_CONVERSATION,
  NEW_MESSAGE,
  NEW_CONVERSATION,
  MESSENGER_ERROR,
} from './constants';

// SEND NEW MESSAGE
export const newMessage = (msgData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/messages', msgData, config);

    dispatch({
      type: NEW_MESSAGE,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: MESSENGER_ERROR,
      payload: {
        msg: error,
        status: error,
      },
    });
  }
};

// GET CONVERSATIONS
export const getConversations = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/messages/conversations/');

    dispatch({
      type: GET_CONVERSATIONS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: MESSENGER_ERROR,
      payload: {
        msg: error,
        status: error,
      },
    });
  }
};

// GET MESSAGES FROM A CONVERSATION
export const getConversation = (conversationId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/messages/conversations/${conversationId}`
    );

    dispatch({
      type: GET_CONVERSATION,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: MESSENGER_ERROR,
      payload: {
        msg: error,
        status: error,
      },
    });
  }
};

export const newConversation = (recipients) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(
      '/api/messages/conversations',
      recipients,
      config
    );

    dispatch({
      type: NEW_CONVERSATION,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: MESSENGER_ERROR,
      payload: {
        msg: error,
        status: error,
      },
    });
  }
};
