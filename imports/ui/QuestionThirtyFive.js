import React from 'react';
import Yup from 'yup';
import {withFormik, Form, Field} from 'formik';
import {browserHistory} from 'react-router';
import TitleBar from './TitleBar';
import Section from './Section';
import {Survey} from './../api/survey';

export default class QuestionThirtyFive extends React.Component {
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
      <p className='questionList__message'>35. Referring to the same incident, chose all the sources you checked with to make sure the severe weather threat was serious.</p>
    </div>

    <Form>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='national' value='National Weather Service warning'/>
          National Weather Service warning
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='environmental' value='Environmental cues (extreme amounts of rainfall, water on roadway, etc.)'/>
          Environmental cues (extreme amounts of rainfall, water on roadway, etc.)
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='local' value='Local television channel'/>
          Local television channel
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='weather' value='The Weather Channel'/>
          The Weather Channel
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='station' value='Local radio station'/>
          Local radio station
        </label>
      </div>

      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='leaders' value='Local Leaders and elders'/>
          Local Leaders and elders
        </label>
      </div>

      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='internet' value='Internet'/>
          Internet
        </label>
      </div>

      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='neighbors' value='Neighbors, friends, or family contacted me'/>Neighbors, friends, or family contacted me
        </label>
      </div>

      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='q_35_answer' value='An official called me on the phone'/>
          An official called me on the phone
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field className='form__input' type='input' name='q_35_answer_other' placeholder='Other'/>
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
    let answer = ''
    if (values.national) {
      answer = answer + ' , ' + 'National Weather Service warning';
    }

    if (values.local) {
      answer = answer + ' , ' + 'Local television channel';
    }

    if (values.weather) {
      answer = answer + ' , ' + 'The Weather Channel';
    }

    if (values.station) {
      answer = answer + ' , ' + 'Local checkbox station';
    }

    if (values.leaders) {
      answer = answer + ' , ' + 'Local Leaders and elders';
    }

    if (values.internet) {
      answer = answer + ' , ' + 'Internet';
    }

    if (values.neighbors) {
      answer = answer + ' , ' + 'An official called me on the phone';
    }
    if (values.q_35_answer_other) {
      answer = answer + ' , ' + values.q_35_answer_other;
    }
    let surveyDoc = Survey.find({}, {
      sort: {
        number: -1
      },
      limit: 1
    }).fetch();
    let surveyIndex = surveyDoc[0]._id;
    console.log(answer);

    Survey.update({
      '_id': surveyIndex
    }, {
      $set: {
        Question_35: answer
      }

    });
    if (answer) {
      browserHistory.push("/q36");
    }

  }
})(AppQ)
