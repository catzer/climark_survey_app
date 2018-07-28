import React from 'react';
import Yup from 'yup';
import {withFormik, Form, Field} from 'formik';
import {browserHistory} from 'react-router';
import TitleBar from './TitleBar';
import Section from './Section';
import {Survey} from './../api/survey';

export default class QuestionThirtySix extends React.Component {
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
      <p className='questionList__message'>36. Referring again to the same incident, what did you do after you received the severe weather warning information? (Please choose only one response)</p>
    </div>

    <Form>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_36_answer' value='I left immediately and Moved to a location outside the warning area'/>
          I left immediately and Moved to a location outside the warning area
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_36_answer' value='I sold my livestock'/>
          I sold my livestock
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_36_answer' value='I took Insurance for my livestock'/>
          I took Insurance for my livestock
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_36_answer' value='I slaughtered my animals'/>
          I slaughtered my animals
        </label>
      </div>

      <div className='question__spacing'>
        <label >
          <Field className='form__input' type='input' name='q_36_answer_other' placeholder='Other'/>
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
    if (values.q_36_answer) {
      Survey.update({
        '_id': surveyIndex
      }, {
        $set: {
          Question_36: values.q_36_answer
        }

      });
      browserHistory.push("/q37");
    } else if (values.q_36_answer_other) {
      Survey.update({
        '_id': surveyIndex
      }, {
        $set: {
          Question_36: values.q_36_answer_other
        }

      });

      browserHistory.push("/q37");
    }
  }
})(AppQ)
