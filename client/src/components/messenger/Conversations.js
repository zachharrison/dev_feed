import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getConversation,
  getConversations,
  newMessage,
} from '../../actions/messenger';

const Conversations = ({
  auth: { user },
  newMessage,
  getConversations,
  getConversation,
  messenger: { conversation, conversations },
}) => {
  useEffect(() => {
    getConversations();
  }, [getConversations, getConversation]);

  const [active, setActive] = useState('');
  const [text, setText] = useState('');

  const handleClick = (id) => {
    setActive(id);
    getConversation(id);
  };
  console.log('Conversation from state', conversation);
  console.log('Active Conversation from state', active);
  console.log('Conversations from state', conversations);
  console.log('user id from state', user._id);
  const onSubmit = (e) => {
    e.preventDefault();
    let to;
    let from;

    if (!active) {
      setText('');
      return;
    }

    const activeConversation = conversations.find(
      (convo) => convo._id === active
    );

    // LOOP THROUGH RECIPIENTS ARRAY AND ASSIGN TO AND FROM BASED ON WHO IS LOGGED IN
    from = activeConversation.recipients.find((u) => u._id === user._id);
    to = activeConversation.recipients.find((u) => u._id !== user._id);

    newMessage({ from, to, text });

    setText('');

    console.log(`The message is sent from user id ${from} to user id ${to}`);
  };

  return (
    <>
      <section className='conversation-items'>
        {conversations.map((convo) => (
          <div
            onClick={() => handleClick(convo._id)}
            key={convo._id}
            className={`conversation-item ${
              active === convo._id ? 'active' : ''
            }`}
          >
            <div className='desc-contact'>
              <p className='name'>{convo.recipients[0].name}</p>
              <p className='message'>{convo.lastMessage} </p>
            </div>
          </div>
        ))}
      </section>
      <div className='conversation'>
        <div className='messages'>
          <ul className='message-list'>
            {conversation.map((convo, index) => (
              <li
                key={index}
                className={convo.from._id === user._id ? 'replies' : 'sent'}
              >
                <p>{convo.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={onSubmit} className='message-input-container'>
          <input
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            className='message-input'
            placeholder='Type your message here'
          />
        </form>
      </div>
    </>
  );
};

Conversations.propTypes = {
  auth: PropTypes.object.isRequired,
  messenger: PropTypes.object.isRequired,
  newMessage: PropTypes.func.isRequired,
  getConversations: PropTypes.func.isRequired,
  getConversation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  messenger: state.messenger,
  conversations: state.conversations,
  conversation: state.conversation,
});

export default connect(mapStateToProps, {
  getConversation,
  getConversations,
  newMessage,
})(Conversations);
