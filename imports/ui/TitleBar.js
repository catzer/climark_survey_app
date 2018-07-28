import React from 'react';
import PropTypes from 'prop-types';
import {Accounts} from 'meteor/accounts-base';
import ChangePassword from './ChangePassword';

export default class TitleBar extends React.Component {
  render() {
    return (<div className='title-bar'>
      <div className='wrapper'>
        <div className='player'>
          <div>
            <h1>{this.props.title}</h1>
          </div>
          {/* <div className='player__actions'>
            <button className='checkBox' onClick={this.onLogout.bind(this)}>Logout</button>
          </div>
          <div className='player__actions'>
            <button className='checkBox' onClick={this.onChangePassword.bind(this)}>Change Password</button>
          </div> */}
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

TitleBar.propTypes = {
  title: PropTypes.string.isRequired
};
