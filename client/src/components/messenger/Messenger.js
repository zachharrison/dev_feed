import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getConversations } from '../../actions/messenger';
import Conversations from './Conversations';
import Conversation from './Conversation';

const Messenger = ({ getConversations, messenger: { conversations } }) => {
  useEffect(() => {
    getConversations();
  }, [getConversations]);

  return (
    <div className='chat-container'>
      <Conversations conversations={conversations} />
      <Conversation />
    </div>
  );
};

Messenger.propTypes = {
  getConversations: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  messenger: state.messenger,
  conversations: state.conversations,
});

export default connect(mapStateToProps, { getConversations })(Messenger);
