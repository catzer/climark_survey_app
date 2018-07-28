import React from 'react';
import PropTypes from 'prop-types';
import TitleBar from './TitleBar';
import Section from './Section';
import QuestionOne from './QuestionOne';

export default class App extends React.Component {
  render() {
    return (<div>

      <TitleBar title='Weather Survey'/>
      <Section section='Section A:DEMOGRAPHICS'/>
      <QuestionOne/>
    </div>);
  }
}
