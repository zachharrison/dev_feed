import React from 'react';
import PropTypes from 'prop-types';

const Conversations = (props) => {
  return (
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
  );
};

Conversations.propTypes = {};

export default Conversations;
