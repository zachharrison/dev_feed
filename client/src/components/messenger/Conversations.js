import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import {
  getConversation,
  getConversations,
  newMessage,
  newConversation,
} from '../../actions/messenger';
import { getProfiles } from '../../actions/profile';

const Conversations = ({
  getProfiles,
  profile: { profiles, loading },
  auth: { user },
  newMessage,
  newConversation,
  getConversations,
  getConversation,
  messenger: { conversation, conversations },
}) => {
  const [active, setActive] = useState(
    conversations.length ? conversations[0]._id : ''
  );
  const [text, setText] = useState('');

  const handleConversationClick = (id) => {
    setActive(id);
    getConversation(id);
  };

  // CREATES A NEW CONVERSATION WHEN A USER ITEM IS CLICKED
  const handleUserClick = (recipients, id) => {
    setActive(id);
    console.log(recipients);
    newConversation(recipients);
  };

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

  useEffect(() => {
    if (conversations.length) {
      getConversation(conversations[0]._id);
    }
  }, []);

  useEffect(() => {
    getConversations();
    getProfiles();
  }, [getConversations, getProfiles]);

  return (
    <>
      <Tabs>
        <TabList className='form-group-row'>
          <Tab className='m-1'>Chats</Tab>
          <Tab className='m-1'>Users</Tab>
        </TabList>

        <TabPanel>
          <section className='conversation-items'>
            {conversations.map((convo) => (
              <div
                onClick={() => handleConversationClick(convo._id)}
                key={convo._id}
                className={`conversation-item ${
                  active === convo._id ? 'active' : ''
                }`}
              >
                <div className='desc-contact'>
                  <p className='name'>
                    {convo.recipients[0].name === user.name
                      ? convo.recipients[1].name
                      : convo.recipients[0].name}
                  </p>
                  <p className='message'>{convo.lastMessage} </p>
                </div>
              </div>
            ))}
          </section>
        </TabPanel>
        <TabPanel>
          <section className='profile-items'>
            {profiles.map((profile) => (
              <div
                onClick={() =>
                  handleUserClick(
                    { to: profile.user._id, from: user._id },
                    profile.user._id
                  )
                }
                key={profile.user.name}
                className={`profile-item ${
                  active === user._id ? 'active' : ''
                }`}
              >
                <div className='form-group-row'>
                  <img
                    className='photo mx-1'
                    src={profile.image}
                    alt='profile'
                  />
                  <p>{profile.user.name}</p>
                </div>
              </div>
            ))}
          </section>
        </TabPanel>
      </Tabs>

      <div className='conversation'>
        <div className='messages'>
          <ul className='message-list'>
            {conversation.map((convo, index) => (
              <li
                key={convo._id}
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
  newConversation: PropTypes.func.isRequired,
  getConversations: PropTypes.func.isRequired,
  getConversation: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  messenger: state.messenger,
  conversations: state.conversations,
  conversation: state.conversation,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getConversation,
  getConversations,
  newMessage,
  newConversation,
  getProfiles,
})(Conversations);
