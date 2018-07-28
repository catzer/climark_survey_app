import React from 'react';
import Yup from 'yup';
import {withFormik, Form, Field} from 'formik';
import {browserHistory} from 'react-router';
import TitleBar from './TitleBar';
import Section from './Section';
import {Survey} from './../api/survey';

export default class QuestionEleven extends React.Component {
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
      <p className='questionList__message'>11. This is the number of adults(18 years and older) who live in my home:</p>
    </div>

    <Form>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='adults_in_my_house' value='1'/>
          1
        </label>
      </div>

      <div className='question__spacing'>
        <label >
          <Field type='radio' name='adults_in_my_house' value='2'/>
          2
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='adults_in_my_house' value='3'/>
          3
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='adults_in_my_house' value='4'/>
          4
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='adults_in_my_house' value='5+'/>
          5+
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
    console.log('The number of adults in my house:' + values.adults_in_my_house);
    if (!!values.adults_in_my_house) {
      browserHistory.push("/q12");
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
        Question_11: values.adults_in_my_house
      }

    });
  }
})(AppQ)
