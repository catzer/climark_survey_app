import React from 'react';
import Yup from 'yup';
import {withFormik, Form, Field} from 'formik';
import {browserHistory} from 'react-router';
import TitleBar from './TitleBar';
import Section from './Section';
import {Survey} from './../api/survey';

export default class QuestionSeventeen extends React.Component {
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
      <p className='questionList__message'>17. How often do you generally get your weather information?</p>
    </div>

    <Form>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='several' value='Several times per day'/>
          Several times per day
        </label>
      </div>

      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='once' value='Several times per day'/>
          Once per day
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='two' value='2-5 times per week'/>
          2-5 times per week
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='weekly' value='Weekly'/>
          Weekly
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='occassionaly' value='Occasionally'/>
          Occasionally
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='none' value='None'/>
          None
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field className='form__input' type='text' name='others' placeholder='Other'/>
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
    if (values.several) {
      answer = 'Several times per day';
    }

    if (values.once) {
      answer = answer + ' , ' + 'Once per day';
    }

    if (values.two) {
      answer = answer + ' , ' + '2-5 times per week';
    }

    if (values.weekly) {
      answer = answer + ' , ' + 'Weekly';
    }

    if (values.occassionaly) {
      answer = answer + ' , ' + 'Occassionaly';
    }
    if (values.none) {
      answer = answer + ' , ' + 'None';
    }
    if (values.others) {
      answer = answer + ' , ' + values.others;
    }
    if (answer) {
      browserHistory.push("/q18");
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
        Question_17: answer
      }

    });

  }
})(AppQ)
