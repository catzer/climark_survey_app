import React from 'react';
import PropTypes from 'prop-types';

export default class Section extends React.Component {
  render() {
    return (
      <div className='title-bar'>
        <div className='wrapper'>
          <h2>{this.props.section}</h2>
        </div>
      </div>);
  }

}
