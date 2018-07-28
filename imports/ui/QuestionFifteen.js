import React from 'react';
import Yup from 'yup';
import {withFormik, Form, Field} from 'formik';
import {browserHistory} from 'react-router';
import TitleBar from './TitleBar';
import Section from './Section';
import {Survey} from './../api/survey';

export default class QuestionFifteen extends React.Component {
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
      <p className='questionList__message'>15. Which severe weather outbreak(s) affects your community?</p>
    </div>

    <Form>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='draught' value='Drought'/>
          Drought
        </label>
      </div>

      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='heat' value='Heat'/>
          Heat
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='floods' value='Floods'/>
          Floods
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='damaging_winds' value='Damaging winds'/>
          Damaging Winds
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='severe_thunderstorm' value='Severe Thunderstorm'/>
          Severe Thunderstorm
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='all' value='All of the above'/>
          All of the above
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='none' value='None of the above'/>
          None
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field className='form__input' type='text' name='weather_outbreaks_other' placeholder='Other'/>
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
    //populate the array for values selected in the checklist
    let answer = '';
    if (values.draught) {
      answer = 'Draught ';

    }
    if (values.heat) {
      answer = answer + ',' + 'Heat';
    }

    if (values.floods) {
      answer = answer + ',' + 'Floods';
    }
    if (values.damaging_winds) {
      answer = answer + ',' + 'Damaging Floods';
    }

    if (values.severe_thunderstorm) {
      answer = answer + ',' + 'Severe Thunderstorm';
    }

    if (values.all) {
      answer = answer + ',' + 'all';
    }

    if (values.none) {
      answer = answer + ',' + 'none';
    }
    if (values.weather_outbreaks_other) {
      answer = answer + ',' + values.weather_outbreaks_other;
    }
    console.log(answer);
    if (answer) {
      browserHistory.push("/q16");
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
        Question_15: answer
      }

    });

  }
})(AppQ)
