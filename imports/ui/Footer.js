import React from 'react';
import PropTypes from 'prop-types';
import {Accounts} from 'meteor/accounts-base';
import ChangePassword from './ChangePassword';
import {browserHistory} from 'react-router';

export default class Footer extends React.Component {
  render() {
    return (<div className='title-bar'>
      <div className='wrapper'>
        <div className='player'>
          <div>
            <p>{this.props.title}</p>
          </div>
          <div className='player__actions'>
            <button className='checkBox' onClick={this.onLogout.bind(this)}>Logout</button>
          </div>
          <div className='player__actions'>
            <button className='checkBox' onClick={this.onChangePassword.bind(this)}>Change Password</button>
          </div>
        </div>
      </div>
    </div>);
  }

  onLogout() {
    Accounts.logout();
  }

  onChangePassword(){
    browserHistory.push('/changepassword');
  }

}

Footer.propTypes = {
  title: PropTypes.string.isRequired
};
