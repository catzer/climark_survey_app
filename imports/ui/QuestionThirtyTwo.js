import React from 'react';
import Yup from 'yup';
import {withFormik, Form, Field} from 'formik';
import {browserHistory} from 'react-router';
import TitleBar from './TitleBar';
import Section from './Section';
import {Survey} from './../api/survey';

export default class QuestionThirtyTwo extends React.Component {
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
        32. The number of severe weather outbreaks I have experienced in my lifetime is:</p>
    </div>

    <Form>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_32_answer' value='1'/>
          1
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_32_answer' value='2'/>
          2
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_32_answer' value='3'/>
          3
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_32_answer' value='4'/>
          4
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_32_answer' value='5-10'/>
          5-10
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_32_answer' value='11 or more'/>
          11 or More
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
    console.log('The q_32_answer ' + values.q_32_answer);
    if (values.q_32_answer) {
      browserHistory.push("/q33");
    }

    Survey.update({
      '_id': surveyIndex
    }, {
      $set: {
        Question_32: values.q_32_answer
      }

    })
  }
})(AppQ)
