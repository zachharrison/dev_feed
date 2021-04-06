import React from 'react';

const Register = () => {
  return (
    <>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form action='dashboard.html' className='form'>
        <div className='form-group'>
          <input type='text' placeholder='Name' required />
        </div>
        <div className='form-group'>
          <input type='email' placeholder='Email Address' />
        </div>
        <div className='form-group'>
          <input type='password' placeholder='Password' minlength='6' />
        </div>
        <div className='form-group'>
          <input type='password' placeholder='Confirm Password' minlength='6' />
        </div>
        <div className='form-group'>
          <input type='submit' value='Register' className='btn btn-primary' />
        </div>
      </form>
      <p className='my-1'>
        Already have an account? <a href='login.html'> Sign In</a>
      </p>
    </>
  );
};

export default Register;
