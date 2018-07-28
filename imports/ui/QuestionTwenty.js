import React from 'react';
import Yup from 'yup';
import {withFormik, Form, Field} from 'formik';
import {browserHistory} from 'react-router';
import TitleBar from './TitleBar';
import Section from './Section';
import {Survey} from './../api/survey';

export default class QuestionTwenty extends React.Component {
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
      <p className='questionList__message'>20. What is the correct definition of National Weather Service Warning and Watches for severe weather?</p>
    </div>

    <Form>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_20_answer' value='Warnings indicate that condition are favorable for severe weather in the next several months; Watches are issued when severe weather is occuring or is imminent in the next 7-30 days'/>
          Warnings indicate that condition are favorable for severe weather in the next several months; Watches are issued when severe weather is occuring or is imminent in the next 7-30 days
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_20_answer' value='Watches indicate that condition are favorable for severe weather in the next several months; Warnings are issued when severe weather is occuring or is imminent in the next 7-30 days'/>
          Watches indicate that condition are favorable for severe weather in the next several months; Warnings are issued when severe weather is occuring or is imminent in the next 7-30 days
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_20_answer' value='I dont know'/>
          I dont know
        </label>
      </div>

      <div className='question__spacing'>
        <label >
          <Field className='form__input' type='input' name='q_20_answer_other' placeholder='Other'/>
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
    if (values.q_20_answer) {
      browserHistory.push("/q21");
      Survey.update({
        '_id': surveyIndex
      }, {
        $set: {
          Question_20: values.q_20_answer
        }

      });
      browserHistory.push("/q21");
    } else if (values.q_20_answer_other) {
      browserHistory.push("/q21");
      Survey.update({
        '_id': surveyIndex
      }, {
        $set: {
          Question_20: values.q_20_answer_other
        }

      });

    }

  }
})(AppQ)
