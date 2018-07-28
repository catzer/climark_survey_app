import React from 'react';
import Yup from 'yup';
import {withFormik, Form, Field} from 'formik';
import {browserHistory} from 'react-router';
import TitleBar from './TitleBar';
import Section from './Section';
import {Survey} from './../api/survey';

export default class QuestionThirty extends React.Component {
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
      <Section section='Section D: Your Experiences with Severe Weather'/>
      <FormikApp/>
    </div>)
  }
}
const AppQ = (values, handleChange, handleSubmit) => {
  return (<div className='wrapper'>
    <div className='questionList'>
      <p className='questionList__message'>
        30. I have experienced a severe weather outbreak in my lifetime (flash flood, drought, severe wind, severe Sandstorm, etc.)</p>
    </div>

    <Form>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_30_answer' value='Yes'/>
          Yes
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_30_answer' value='No'/>
          No
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
    if (values.q_30_answer === 'Yes') {
      console.log('The q_30_answer ' + values.q_30_answer);
      browserHistory.push("/q31");
      Survey.update({
        '_id': surveyIndex
      }, {
        $set: {
          Question_30: values.q_30_answer
        }

      })
    } else if (values.q_30_answer==='No') {
      browserHistory.push("/q35");
      Survey.update({
        '_id': surveyIndex
      }, {
        $set: {
          Question_30: values.q_30_answer
        }

      });
    }

  }
})(AppQ)
