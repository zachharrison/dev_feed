import React from 'react';
import PropTypes from 'prop-types';

const Conversations = ({ conversations }) => {
  return (
    <section className='conversation-items'>
      <div className='conversation-item message-active'>
        {conversations.map((conversation) => (
          <div key={conversation._id} className='conversation-item'>
            <div className='desc-contact'>
              <p className='name'>{conversation.recipients[0]}</p>
              <p className='message'>{conversation.lastMessage} </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

Conversations.propTypes = {
  conversations: PropTypes.array.isRequired,
};

export default Conversations;
