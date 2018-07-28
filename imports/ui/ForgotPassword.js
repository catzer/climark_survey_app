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
    //  let password = this.refs.password.value.trim();
    //Forgot password
    Accounts.forgotPassword({
      email
    }, (err) => {
      // console.log('forgot password callback',err);
      if (err) {
        this.setState({error: err.reason});
      } else {
        this.setState({error: ''});
      }
    });
    if (Meteor.isServer) {
      //send email link
      Accounts.sendResetPasswordEmail(email);
    }

    //when the user clicks the password reset Link

  }

  //render the input form

  render() {
    return (<div className='boxed-view'>
      <div className='boxed-view__box'>
        <h2>
          Weather Survey
        </h2>
        {
          this.state.error
            ? <p>{this.state.error}</p>
            : undefined
        }
        <form onSubmit={this.onSubmit.bind(this)} className='boxed-view__form'>
          <input type='email' ref='email' name='email' placeholder='Please Enter your Email Address'/> {/* <input type='password' ref='password' name='password' placeholder='password'/> */}
          <button className='button'>Forgot Password</button>
        </form>
      </div>
    </div>);
  }
}
