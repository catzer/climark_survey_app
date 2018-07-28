import React from 'react';
import Yup from 'yup';
import {withFormik, Form, Field} from 'formik';
import TitleBar from './TitleBar';
import Section from './Section';
import {browserHistory} from 'react-router';
import {Survey} from './../api/survey';
import {Meteor} from 'meteor/meteor';

export default class QuestionTwo extends React.Component {
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
      <p className='questionList__message'>2.Which organization group do you represent in this study?</p>
    </div>

    <Form>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='orgGroup' value='Local Leader'/>
          Local Leader
        </label>
      </div>

      <div className='question__spacing'>
        <label >
          <Field type='radio' name='orgGroup' value='Lead Pastoralist'/>
          Lead Pastoralist
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='orgGroup' value='Individual Herder'/>
          Individual Herder
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='orgGroup' value='Insurance Agent'/>
          Insurance Agent
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='orgGroup' value='Livestock Buyer'/>
          Livestock Buyer
        </label>
      </div>
      <div className='question__spacing'>
        <label>
          <Field type='radio' name='orgGroup' value='National Government'/>
          National Government
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='orgGroup' value='County Government'/>
          County Government
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='orgGroup' value='Radio and TV Station'/>
          Radio and TV Station
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='orgGroup' value='Non-Governmental Organization'/>
          Non-Governmental Organization
        </label>
      </div>

      <div>
        <button className='checkBox'>Submit</button>
      </div>
    </Form>
  </div>);

}
const FormikApp = withFormik({
  mapPropsToValues({email, password, orgGroup}) {
    return {
      email: email || '',
      password: password || '',
      orgGroup: orgGroup || ''
    }
  },

  handleSubmit(values) {
    console.log('Selected Organizational Group is:' + values.orgGroup);
    if (!!values.orgGroup) {
      browserHistory.push("/q3");
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
        Question_two: values.orgGroup
      }

    });
  }
})(AppQ)
