import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    addComment(postId, { text });
    setText('');
  };

  return (
    <div className='form comment-form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <textarea
            name='text'
            cols='30'
            rows='1'
            placeholder='Add a comment'
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

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
