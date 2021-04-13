import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
// import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  // addLike,
  // removeLike,
  // deletePost,
  auth,
  post: { _id, text, name, user, likes, comments, date },
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          {/* <img src={image} alt='profile' className='round-img' /> */}
          <h4>{name}</h4>
        </Link>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  // addLike: PropTypes.func.isRequired,
  // removeLike: PropTypes.func.isRequired,
  // deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  // addLike,
  // removeLike,
  // deletePost,
})(PostItem);
