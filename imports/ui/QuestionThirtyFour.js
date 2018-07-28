import React from 'react';
import Yup from 'yup';
import {withFormik, Form, Field} from 'formik';
import {browserHistory} from 'react-router';
import TitleBar from './TitleBar';
import Section from './Section';
import {Survey} from './../api/survey';

export default class QuestionThirtyFour extends React.Component {
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
      <p className='questionList__message'>34. Thinking about your most recent severe weather experience, tell us where you first found out about the threat of severe weather. (Please choose only one response)</p>
    </div>

    <Form>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_34_answer' value='National Weather Service warning'/>
          National Weather Service warning
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_34_answer' value='Environmental cues (extreme amounts of rainfall, water on roadway, etc.)'/>
          Environmental cues (extreme amounts of rainfall, water on roadway, etc.)
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_34_answer' value='Local television channel'/>
          Local television channel
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_34_answer' value='The Weather Channel'/>
          The Weather Channel
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_34_answer' value='Local radio station'/>
          Local radio station
        </label>
      </div>

      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_34_answer' value='Local Leaders and elders'/>
          Local Leaders and elders
        </label>
      </div>

      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_34_answer' value='Internet'/>
          Internet
        </label>
      </div>

      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_34_answer' value='Neighbors, friends, or family contacted me'/>Neighbors, friends, or family contacted me
        </label>
      </div>

      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_34_answer' value='An official called me on the phone'/>
          An official called me on the phone
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field className='form__input' type='input' name='q_34_answer_other' placeholder='Other'/>
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
    let surveyDoc = Survey.find({}, {
      sort: {
        number: -1
      },
      limit: 1
    }).fetch();
    let surveyIndex = surveyDoc[0]._id;
    console.log(surveyIndex);
    if (values.q_34_answer) {
      Survey.update({
        '_id': surveyIndex
      }, {
        $set: {
          Question_34: values.q_34_answer
        }

      });
      browserHistory.push("/q35");
    } else if (values.q_34_answer_other){
      Survey.update({
        '_id': surveyIndex
      }, {
        $set: {
          Question_34: values.q_34_answer_other
        }

      });
      browserHistory.push("/q35");
    }
  }
})(AppQ)
