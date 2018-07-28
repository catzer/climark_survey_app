import React from 'react';
import Yup from 'yup';
import {withFormik, Form, Field} from 'formik';
import TitleBar from './TitleBar';
import Section from './Section';
import {browserHistory} from 'react-router';
import {Survey} from './../api/survey';

export default class QuestionEight extends React.Component {
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
      <p className='questionList__message'>8.What is your highest level of education?</p>
    </div>

    <Form>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='education' value='No Schooling'/>
          No Schooling
        </label>
      </div>

      <div className='question__spacing'>
        <label >
          <Field type='radio' name='education' value='Elementary School'/>
          Elementary School
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='education' value='Middle School'/>
          Middle School
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='education' value='High School'/>
          High School
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='education' value='2 year university (Associate Degree)'/>
          2 year university (Associate Degree)
        </label>
      </div>
      <div className='question__spacing'>
        <label>
          <Field type='radio' name='education' value='4 year university (Bachelors degree)-graduate'/>
          4 year university (Bachelors degree)-graduate
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='education' value='Graduate school or higher (Masters, Doctorate)'/>
          Graduate School or higher (Masters, Doctorate)
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
    console.log('Selected Organizational Group is:' + values.education);
    if (!!values.education) {
      browserHistory.push("/q9");
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
        Question_eight: values.education
      }

    });
  }
})(AppQ)
