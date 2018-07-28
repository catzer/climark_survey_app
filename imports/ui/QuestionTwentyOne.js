import React from 'react';
import Yup from 'yup';
import {withFormik, Form, Field} from 'formik';
import {browserHistory} from 'react-router';
import TitleBar from './TitleBar';
import Section from './Section';
import {Survey} from './../api/survey';

export default class QuestionTwentyOne extends React.Component {
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
      <p className='questionList__message'>21. Who is responsible for issuing weather warnings?</p>
    </div>

    <Form>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_21_answer' value='The Local community Leaders'/>
          The Local COmmunity Leaders
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_21_answer' value='The Radio/TV Channel'/>
          The radio/TV Channel
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_21_answer' value='Local TV Meteorologists'/>
          Local TV Meteorologists
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_21_answer' value='The Local National Weather Service Office'/>
          The Local National Weather Service Office
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_21_answer' value='The Local county government'/>
          The county government
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='q_21_answer' value='I dont know'/>
          I dont know
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field className='form__input' type='text' name='q_21_answer_other' placeholder='Other'/>
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
    if (values.q_21_answer_other) {
      Survey.update({
        '_id': surveyIndex
      }, {
        $set: {
          Question_21: values.q_21_answer
        }

      });
      browserHistory.push("/q22");
    } else if (values.q_21_answer) {
      browserHistory.push("/q22");
      Survey.update({
        '_id': surveyIndex
      }, {
        $set: {
          Question_21: values.q_21_answer
        }

      });
      browserHistory.push("/q22");
    }
  }
})(AppQ)
