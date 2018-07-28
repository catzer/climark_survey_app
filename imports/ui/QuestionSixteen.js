import React from 'react';
import Yup from 'yup';
import {withFormik, Form, Field} from 'formik';
import {browserHistory} from 'react-router';
import TitleBar from './TitleBar';
import Section from './Section';
import {Survey} from './../api/survey';

export default class QuestionSixteen extends React.Component {
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
      <p className='questionList__message'>16. Where do you get your weather information (Updates, forecast, etc)? Mark all that apply</p>
    </div>

    <Form>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='weather_channel' value='The weather channel'/>
          Weather Channel
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
          <Field type='checkbox' name='local' value='Local checkbox Stations'/>
          Local Weather Stations
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='television_english' value='Television in English'/>
          Television in English
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='television_local_language' value='Television in Local Language'/>
          Television in Local Language
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='environment' value='Environmental Cues'/>
          Environmental Cues (Look Outside)
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='mobile' value='Mobile Phones'/>
          Mobile Phones
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='word_of_mouth' value='Word of mouth'/>
          Word of mouth
        </label>
      </div>
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
    //Create an array to push the answers
    let answer = '';
    if (values.weather_channel) {
      answer = 'Weather Channel';
    }

    if (values.internet) {
      answer = answer + ', ' + 'Internet';
    }

    if (values.local) {
      answer = answer + ' , ' + 'Local Weather Station';
    }

    if (values.television_english) {
      answer = answer + ' , ' + 'Television in English';
    }

    if (values.environment) {
      answer = answer + ' , ' + 'Environmental Cues';
    }
    if (values.mobile) {
      answer = answer + ' , ' + 'Mobile Phones';
    }

    if (values.word_of_mouth) {
      answer = answer + ' , ' + 'Word of Mouth';
    }
    if (values.other) {
      answer = answer + ' , ' + values.other;
    }

    console.log(answer);
    if (answer) {
      browserHistory.push("/q17");
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
        Question_16: answer
      }

    });

  }
})(AppQ)
