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
import { setAlert } from '../../actions/alert';
import socketIOClient from 'socket.io-client';

const Conversations = ({
  getProfiles,
  profile: { profiles, loading },
  auth: { user },
  newMessage,
  newConversation,
  getConversations,
  getConversation,
  setAlert,
  messenger: { conversation, conversations },
}) => {
  // const socket = socketIOClient('http://localhost:5000', {
  //   transports: ['websocket'],
  // });
  const [activeConversation, setActiveConversation] = useState(
    conversations.length ? conversations[0]._id : ''
  );
  const [activeUser, setActiveUser] = useState('');
  const [text, setText] = useState('');

  const handleConversationClick = (id) => {
    setActiveConversation(id);
    getConversation(id);
  };

  // CREATES A NEW CONVERSATION WHEN A USER ITEM IS CLICKED
  const handleUserClick = (recipients, id) => {
    setActiveUser(id);
    newConversation(recipients);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let to;
    let from;

    if (!activeConversation) {
      setAlert('Please select a chat', 'danger');
      setText('');
      return;
    }

    const activeConvo = conversations.find(
      (convo) => convo._id === activeConversation
    );

    // LOOP THROUGH RECIPIENTS ARRAY AND ASSIGN TO AND FROM BASED ON WHO IS LOGGED IN
    from = activeConvo.recipients.find((u) => u._id === user._id);
    to = activeConvo.recipients.find((u) => u._id !== user._id);

    newMessage({ from, to, text });

    setText('');
  };

  useEffect(() => {
    if (conversations.length) {
      getConversation(conversations[0]._id);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      getConversations();
      getProfiles();
    }
  }, [getConversations, getProfiles, loading]);

  useEffect(() => {
    const socket = socketIOClient('http://localhost:5000', {
      transports: ['websocket'],
    });
    socket.on('messages', (data) => {
      getConversations();
      getConversation(data.conversation);
    });
  }, [onSubmit]);

  return (
    <>
      {!loading && (
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
                      activeConversation === convo._id ? 'active' : ''
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
                {profiles
                  .filter((profile) => profile.user._id !== user._id)
                  .map((profile) => (
                    <div
                      onClick={() =>
                        handleUserClick(
                          { to: profile.user._id, from: user._id },
                          profile.user._id
                        )
                      }
                      key={profile.user.name}
                      className={`profile-item ${
                        activeUser === profile.user._id ? 'active' : ''
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
      )}
    </>
  );
};

Conversations.propTypes = {
  auth: PropTypes.object.isRequired,
  messenger: PropTypes.object.isRequired,
  newMessage: PropTypes.func.isRequired,
  newConversation: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
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
  setAlert,
})(Conversations);
