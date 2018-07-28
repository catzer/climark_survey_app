import React from 'react';
import Yup from 'yup';
import {withFormik, Form, Field} from 'formik';
import {browserHistory} from 'react-router';
import TitleBar from './TitleBar';
import Section from './Section';
import {Survey} from './../api/survey';

export default class QuestionNine extends React.Component {
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
      <Section section='Section A:DEMOGRAPHICS'/>
      <FormikApp/>
    </div>)
  }
}
const AppQ = (values, handleChange, handleSubmit) => {
  return (<div className='wrapper'>
    <div className='questionList'>
      <p className='questionList__message'>9. I have lived in this ward for?</p>
    </div>

    <Form>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='residence_atward_duration' value='under 6 months'/>
          Under 6 months
        </label>
      </div>

      <div className='question__spacing'>
        <label >
          <Field type='radio' name='residence_atward_duration' value='6-11 months'/>
          6-11 months
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='residence_atward_duration' value='1-3 years'/>
          1-3 years
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='residence_atward_duration' value='4-6 years'/>
          4-6 years
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='residence_atward_duration' value='7+ years'/>
          7+ years
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
    console.log('I have lived in this ward for:' + values.residence_atward_duration);
    if (values.residence_atward_duration) {
      browserHistory.push("/q10");
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
        Question_nine: values.residence_atward_duration
      }

    });
  }
})(AppQ)
