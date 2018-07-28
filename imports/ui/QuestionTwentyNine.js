import React from 'react';
import Yup from 'yup';
import {withFormik, Form, Field} from 'formik';
import {browserHistory} from 'react-router';
import TitleBar from './TitleBar';
import Section from './Section';
import {Survey} from './../api/survey';

export default class QuestionTwentyNine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      survey: []
    }
  }
  //Built in lifecycle methods
  //component did mount is called when the component is mounted
  componentDidMount() {
    console.log('Component did mount Link List');
    this.surveyTracker = Tracker.autorun(() => {
      Meteor.subscribe('survey');
      const survey = Survey.find().fetch();
      this.setState({survey});
      console.log(survey);
    })
  }

  //component will unmount is called when the component is unmounted
  componentWillUnmount() {
    console.log('Component will unmount linklist');
    this.surveyTracker.stop();
  }
  render() {
    return (<div>
      <TitleBar title='Weather Survey'/>
      <Section section='Section C: Knowledge of severe weather'/>
      <FormikApp/>
    </div>)
  }
}
const AppQ = (values, handleChange, handleSubmit) => {
  return (<div className='wrapper'>
    <div className='questionList'>
      <p className='questionList__message'>29. Which factors do you feel need to be present in order to classify as severe weather?</p>
    </div>

    <Form>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='wind' value='Severe Wind'/>
          Severe Wind
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='draught' value='Drought'/>
          Drought
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='rain' value='Heavy rain'/>
          Heavy rain
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='heat' value='Severe Heat'/>
          Severe Heat
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='sandstorm' value='Severe Sandstorm'/>
          Severe Sandstorm
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='water' value='Flooding water'/>
          Flooding water
        </label>
      </div>
      {/* <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='' value='All of the above'/>
          All of the above
        </label>
      </div> */
      }
      <div className='question__spacing'>
        <label >
          <Field className='form__input' type='text' name='other' placeholder='Other'/>
        </label>
      </div>
      <div>
        <button className='checkBox'>Submit</button>
      </div>
    </Form>
  </div>);

}
const FormikApp = withFormik({
  mapPropsToValues({email, password, ageGroup}) {
    return {
      email: email || '',
      password: password || '',
      ageGroup: ageGroup || ''
    }
  },

  handleSubmit(values) {
    let answer = '';
    if (values.wind) {
      answer = 'Severe Wind';
    }

    if (values.draught) {
      answer = answer + ' , ' + 'Draught';
    }

    if (values.rain) {
      answer = answer + ' , ' + 'Heavy Rain';
    }

    if (values.heat) {
      answer = answer + ' , ' + 'Severe Heat';
    }
    if (values.sandstorm) {
      answer = answer + ' , ' + 'Severe Sandstorm';
    }
    if (values.water) {
      answer = answer + ' , ' + 'Flooding Water';
    }
    if (values.other) {
      answer = answer + ' , ' + values.other;
    }
    if (answer) {
      browserHistory.push("/q30");
    }

    let surveyDoc = Survey.find({}, {
      sort: {
        number: -1
      },
      limit: 1
    }).fetch();
    let surveyIndex = surveyDoc[0]._id;
    console.log(surveyIndex);
    Survey.update({
      '_id': surveyIndex
    }, {
      $set: {
        Question_29: answer
      }

    });
  }
})(AppQ)
