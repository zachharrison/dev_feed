import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getConversations } from '../../actions/messenger';
import Conversations from './Conversations';
import Conversation from './Conversation';

const Messenger = ({ getConversations, conversations, match }) => {
  useEffect(() => {
    getConversations();
  }, []);

  console.log(conversations);
  return (
    <div className='chat-container'>
      <Conversations />
      <Conversation />
    </div>
  );
};

Messenger.propTypes = {
  getConversations: PropTypes.func.isRequired,
  conversations: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  conversations: state.conversations,
});

export default connect(mapStateToProps, { getConversations })(Messenger);
