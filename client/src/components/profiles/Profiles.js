import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const filteredProfiles = useMemo(() => {
    if (searchTerm === '') {
      return profiles;
    }

    return profiles.filter((profile) =>
      profile.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [profiles, searchTerm]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop' /> Browse and connect with
            developers
          </p>
          <input
            type='text'
            className='search-form'
            placeholder='Search for devs...'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className='profiles profiles-grid'>
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </>
      )}
    </>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
