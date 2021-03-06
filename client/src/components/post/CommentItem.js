import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CommentItem = ({
  postId,
  comment: { _id, text, name, user, image, date },
  auth,
}) => (
  <div className='comment mb-2'>
    <div className='container-center'>
      <img src={image} alt='' />
      <small>
        <p className='text-center'>{name}</p>
      </small>
    </div>
    <p className='comment-text'>{text}</p>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CommentItem);
