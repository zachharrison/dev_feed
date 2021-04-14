import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    addPost({ text });
    setText('');
  };

  return (
    <div className='post-form'>
      <form onSubmit={onSubmit} className='form my-1'>
        <div className='form-group'>
          <textarea
            cols='30'
            rows='1'
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <input
            type='submit'
            value='Submit'
            className='btn btn-primary my-1'
          />
        </div>
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
