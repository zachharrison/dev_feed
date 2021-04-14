import React from 'react';
import PropTypes from 'prop-types';

const PostForm = (props) => {
  return (
    <div className='post-form'>
      <form className='form my-1'>
        <div className='form-group'>
          <textarea
            cols='30'
            rows='1'
            placeholder="What's on your mind?"
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

PostForm.propTypes = {};

export default PostForm;
