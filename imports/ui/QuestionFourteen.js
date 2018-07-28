import React from 'react';
import Yup from 'yup';
import {withFormik, Form, Field} from 'formik';
import {browserHistory} from 'react-router';
import TitleBar from './TitleBar';
import Section from './Section';
import {Survey} from './../api/survey';

export default class QuestionFourteen extends React.Component {
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
const AppQ = () => {
  return (<div className='wrapper'>
    <div className='questionList'>
      <p className='questionList__message'>14. The language mostly spoken in my home is:</p>
    </div>

    <Form>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='language' value='English'/>
          English
        </label>
      </div>

      <div className='question__spacing'>
        <label >
          <Field type='radio' name='language' value='Kiswahili'/>
          Kiswahili
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='language' value='Both (English and Kiswahili)'/>
          Both (English and Kiswahili)
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field className='form__input' type='text' name='language_other' placeholder='Other'/>
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
    if (values.language_other) {
      browserHistory.push("/q15");
      Survey.update({
        '_id': surveyIndex
      }, {
        $set: {
          Question_14: values.language_other
        }

      });
      browserHistory.push("/q15");
    } else if (values.language) {
      browserHistory.push("/q15");
      Survey.update({
        '_id': surveyIndex
      }, {
        $set: {
          Question_14: values.language
        }

      });

    }

  }
})(AppQ)
