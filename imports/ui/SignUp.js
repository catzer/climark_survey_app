import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import {Accounts} from 'meteor/accounts-base';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      survey: []
    }
  }
  //Built in lifecycle methods
  //component did mount is called when the component is mounted

  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    Accounts.createUser({
      email,
      password
    }, (err) => {
      // console.log('this is a call back function', err);
      if (err) {
        this.setState({error:err.reason});
      } else {
        this.setState({error:''});
      }
    });
  }

  render() {
    return (
<div className='boxed-view'>
  <div className='boxed-view__box'>
  <h2>
    Create Account
  </h2>
  {
    this.state.error
      ? <p>{this.state.error}</p>
      : undefined
  }
  <form onSubmit={this.onSubmit.bind(this)} className='boxed-view__form'>
    <input type='email' ref='email' name='email' placeholder='Email'/>
    <input type='password' ref='password' name='password' placeholder='password'/>
    <button className='button'>Create Account</button>
  </form>
  <Link to="/">Already have an account? Login</Link>
</div>
</div>
      );
  }
}
