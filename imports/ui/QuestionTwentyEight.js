import React from 'react';
import Yup from 'yup';
import {withFormik, Form, Field} from 'formik';
import {browserHistory} from 'react-router';
import TitleBar from './TitleBar';
import Section from './Section';
import {Survey} from './../api/survey';

export default class QuestionTwentySeven extends React.Component {
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
      <p className='questionList__message'>28. Overall, do you think that Severe Weather Warnings/Watches are:</p>
    </div>

    <Form>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_28_answer' value='issued too far in advance; I don’t need such a long advanced notice of severe weather'/>issued too far in advance; I don’t need such a long advanced notice of severe weather
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_28_answer' value='issued with about as much advanced notice as I require'/>
          issued with about as much advanced notice as I require
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_28_answer' value='issued too late; I don’t have enough time to prepare'/>
          issued too late; I don’t have enough time to prepare
        </label>
      </div>

      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_28_answer' value='issued way too late; the severe weather occurs before I am aware it’s coming'/>
          issued way too late; the severe weather occurs before I am aware it’s coming
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
    console.log(values.language_other);
    if (values.q_28_answer) {
      browserHistory.push("/q29");
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
        Question_28: values.q_28_answer
      }

    });
  }
})(AppQ)
