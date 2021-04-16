import React from 'react';
import PropTypes from 'prop-types';

const Messenger = (props) => {
  return (
    <div className='chat-container'>
      <section className='conversation-items'>
        <div className='conversation-item message-active'>
          {/* <div
            className='photo'
            style='
          background-image: url(https://image.noelshack.com/fichiers/2017/38/2/1505775062-1505606859-portrait-1961529-960-720.jpg);
        '
          ></div> */}
          <div className='desc-contact'>
            <p className='name'>Megan Leib</p>
            <p className='message'>9 pm at the bar if possible 😳</p>
          </div>
        </div>

        <div className='conversation-item'>
          {/* <div
            className='photo'
            style='
          background-image: url(http://e0.365dm.com/16/08/16-9/20/theirry-henry-sky-sports-pundit_3766131.jpg?20161212144602);
        '
          ></div> */}
          <div className='desc-contact'>
            <p className='name'>Dave Corlew</p>
            <p className='message'>
              Let's meet for a coffee or something today ?
            </p>
          </div>
        </div>

        <div className='conversation-item'>
          <div className='desc-contact'>
            <p className='name'>Jerome Seiber</p>
            <p className='message'>I've sent you the annual report</p>
          </div>
        </div>

        <div className='conversation-item'>
          <div className='desc-contact'>
            <p className='name'>Elsie Amador</p>
            <p className='message'>What the f**k is going on ?</p>
          </div>
        </div>

        <div className='conversation-item'>
          <div className='desc-contact'>
            <p className='name'>Billy Southard</p>
            <p className='message'>Ahahah 😂</p>
          </div>
        </div>
      </section>

      <div className='conversation'>
        <div className='messages'>
          <ul className='message-list'>
            <li className='sent'>
              <img src='http://emilcarlsson.se/assets/mikeross.png' alt='' />
              <p>
                How the hell am I supposed to get a jury to believe you when I
                am not even sure that I do?!
              </p>
            </li>
            <li className='replies'>
              <img
                src='http://emilcarlsson.se/assets/harveyspecter.png'
                alt=''
              />
              <p>
                When you're backed against the wall, break the god damn thing
                down.
              </p>
            </li>
            <li className='replies'>
              <img
                src='http://emilcarlsson.se/assets/harveyspecter.png'
                alt=''
              />
              <p>Excuses don't win championships.</p>
            </li>
            <li className='sent'>
              <img src='http://emilcarlsson.se/assets/mikeross.png' alt='' />
              <p>Oh yeah, did Michael Jordan tell you that?</p>
            </li>
            <li className='replies'>
              <img
                src='http://emilcarlsson.se/assets/harveyspecter.png'
                alt=''
              />
              <p>No, I told him that.</p>
            </li>
            <li className='replies'>
              <img
                src='http://emilcarlsson.se/assets/harveyspecter.png'
                alt=''
              />
              <p>What are your choices when someone puts a gun to your head?</p>
            </li>
            <li className='sent'>
              <img src='http://emilcarlsson.se/assets/mikeross.png' alt='' />
              <p>
                What are you talking about? You do what they say or they shoot
                you.
              </p>
            </li>
            <li className='replies'>
              <img
                src='http://emilcarlsson.se/assets/harveyspecter.png'
                alt=''
              />
              <p>
                Wrong. You take the gun, or you pull out a bigger one. Or, you
                call their bluff. Or, you do any one of a hundred and forty six
                other things.
              </p>
            </li>
          </ul>
        </div>
        <div className='message-input-container'>
          <input
            type='text'
            className='message-input'
            placeholder='Type your message here'
          />
        </div>
      </div>
    </div>
  );
};

Messenger.propTypes = {};

export default Messenger;
