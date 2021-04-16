import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';

const PostFocus = ({
  auth,
  children,
  post: { _id, text, name, user, likes, comments, date, image },
}) => {
  return (
    <div className='post-focus bg-light p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img src={image} alt='profile' className='round-img' />
          <h4 className='text-center'>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1 text-center'>{text}</p>
        <small className='post-date mb-2 text-center'>
          <p className='text-center'>Posted on {formatDate(date)}</p>
        </small>
      </div>
      {children}
    </div>
  );
};

PostFocus.propTypes = {};

export default PostFocus;
