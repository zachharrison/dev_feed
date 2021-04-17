import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getConversations } from '../../actions/messenger';
import Conversations from './Conversations';
import Conversation from './Conversation';

const Messenger = () => {
  return (
    <div className='chat-container'>
      <Conversations />
      {/* <Conversation /> */}
    </div>
  );
};

export default Messenger;
