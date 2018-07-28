import React from 'react';
import ReactDOM from 'react-dom';
import {Accounts} from 'meteor/accounts-base';

export default class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      error: ''
    }
  }
  //enter the email to send the reset password to
  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    let confirmPassword = this.refs.confirmPassword.value.trim();
      console.log(password);
    if (Meteor.isServer) {
      Accounts.setPassword(email,password);
      console.log(password);
    }

  }

  //render the input form

  render() {
    return (<div className='boxed-view'>
      <div className='boxed-view__box'>
        <h2>
          Forgot Password
        </h2>
        {
          this.state.error
            ? <p>{this.state.error}</p>
            : undefined
        }
        <form onSubmit={this.onSubmit.bind(this)} className='boxed-view__form'>
          <input type='email' ref='email' name='email' placeholder='Email'/>
          <input type='password' ref='password' name='password' placeholder='New Password'/>
          <input type='password' ref='confirmPassword' name='password' placeholder='Confirm New password'/>
          <button className='button'>Change Password</button>
        </form>
      </div>
    </div>);
  }
}
