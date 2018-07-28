import React from 'react';
import Yup from 'yup';
import {withFormik, Form, Field} from 'formik';
import {browserHistory} from 'react-router';
import TitleBar from './TitleBar';
import Section from './Section';
import {Survey} from './../api/survey';

export default class QuestionNineteen extends React.Component {
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
      <Section section='Section B:Reception of Information'/>
      <FormikApp/>
    </div>)
  }
}
const AppQ = (values, handleChange, handleSubmit) => {
  return (<div className='wrapper'>
    <div className='questionList'>
      <p className='questionList__message'>19. What weather information do you consider most important?</p>
    </div>

    <Form>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_19_answer' value='Environmental Cues'/>
          Environmental Cues
        </label>
      </div>

      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_19_answer' value='The weather channel'/>
          The weather channel
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_19_answer' value='Internet'/>
          Internet
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_19_answer' value='Local Radio Stations'/>
          Local Radio Stations
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_19_answer' value='Television'/>
          Television
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_19_answer' value='Local Leaders'/>
          Local Leaders
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_19_answer' value='Mobile Phones'/>
          Mobile Phones
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field className='form__input' type='text' name='q_19_answer_other' placeholder='Other'/>
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
    console.log('The q_19_answer mostly spoken in my home is:' + values.q_19_answer);
    if (values.q_19_answer_other) {

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
          Question_19: values.q_19_answer_other
        }

      });
      browserHistory.push("/q20");
    } else if (values.q_19_answer) {
      console.log(values.language_other);

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
          Question_19: values.q_19_answer
        }

      });
      browserHistory.push("/q20");
    }
  }
})(AppQ)
