import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CommentForm = (props) => {
  const [text, setText] = useState('');

  return (
    <div className='form comment-form'>
      <form>
        <div className='form-group'>
          <textarea
            name='text'
            cols='30'
            rows='1'
            placeholder='
          Add a comment'
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <input type='submit' className='btn btn-dark my-1' value='Submit' />
        </div>
      </form>
    </div>
  );
};

CommentForm.propTypes = {};

export default CommentForm;
