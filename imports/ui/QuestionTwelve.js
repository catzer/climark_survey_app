import React from 'react';
import Yup from 'yup';
import {withFormik, Form, Field} from 'formik';
import {browserHistory} from 'react-router';
import TitleBar from './TitleBar';
import Section from './Section';
import {Survey} from './../api/survey';

export default class QuestionTwelve extends React.Component {
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
      <p className='questionList__message'>12. What livestock do you keep:</p>
    </div>

    <Form>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='camel' value='Camel'/>
          Camel
        </label>
      </div>

      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='cattle' value='Cattle'/>
          Cattle
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='goat' value='Goat'/>
          Goat
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='sheep' value='Sheep'/>
          Sheep
        </label>
      </div>
      {/* <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='livestock' value='All of the above'/> All of the above
        </label>
      </div> */
      }

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
    if (values.camel) {
      answer = 'Camel';
    }
    if (values.cattle) {
      answer = answer + ' , ' + 'Cattle';
    }
    if (values.goat) {
      answer = answer + ' , ' + 'Goat';
    }
    if (values.sheep) {
      answer = answer + ' , ' + 'Sheep';
    }
    console.log(answer);
    if (!answer.length == 0) {
      browserHistory.push("/q13");
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
        Question_12: answer
      }

    });
  }
})(AppQ)
