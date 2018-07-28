import React from 'react';
import Yup from 'yup';
import {withFormik, Form, Field} from 'formik';
import {browserHistory} from 'react-router';
import TitleBar from './TitleBar';
import Section from './Section';
import {Survey} from './../api/survey';

export default class QuestionTwentySix extends React.Component {
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
      <p className='questionList__message'>26. Suppose a severe weather WARNING (Drought, Heat, flash flood, etc) was issued for your county/Ward, what action would you take?</p>
    </div>

    <Form>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='continue' value='Continue normal activities'/>
          Continue normal activities
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='take' value='Take a look at the sky and look for signs of threatening weather'/>
          Take a look at the sky and look for signs of threatening weather
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='call' value='Call a friend or relative located in other wards and ask them what weather they are
                experiencing.'/>
          Call a friend or relative located in other wards and ask them what weather they are experiencing.
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='go' value='Go to another source of weather information (TV, checkbox) to confirm threat before taking
                  additional action'/>
          Go to another source of weather information (TV, checkbox) to confirm threat before taking additional action
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='move' value='Move to favorable areas (higher ground, closer to water source, etc)'/>
          Move to favorable areas (higher ground, closer to water source, etc)
        </label>
      </div>

      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='plan' value='Plan to buy off the livestock from herders'/>
          Plan to buy off the livestock from herders
        </label>
      </div>

      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='sale' value='Plan to sale Insurance product'/>
          Plan to sale Insurance product
        </label>
      </div>

      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='take' value='Plan to take insurance for the livestock'/>
          Plan to take insurance for the livestock
        </label>
      </div>

      <div className='question__spacing'>
        <label >
          <Field type='checkbox' name='sell' value='Plan to  sell off the livestock'/>
          Plan to sell off the livestock
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field className='form__input' type='input' name='other' placeholder='Other'/>
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

    let answer = '';
    if (values.continue) {
      answer = 'Continue normal activities';
    }

    if (values.take) {
      answer = answer + ' , ' + 'Take a look at the sky and look for signs of threatening weather';
    }

    if (values.call) {
      answer = answer + ' , ' + 'Call a friend or relative located in other wards and ask them what weather they are experiencing.';
    }

    if (values.go) {
      answer = answer + ' , ' + 'Go to another source of weather information (TV, checkbox) to confirm threat before taking additional action';
    }

    if (values.move) {
      answer = answer + ' , ' + 'Move to favorable areas (higher ground, closer to water source, etc)';
    }
    if (values.plan) {
      answer = answer + ' , ' + 'Plan to buy off the livestock from herders';
    }
    if (values.sale) {
      answer = answer + ' , ' + 'Plan to sale Insurance product';
    }

    if (values.take) {
      answer = answer + ' , ' + 'Plan to take insurance for the livestock';
    }
    if (values.sell) {
      answer = answer + ' , ' + 'Plan to sell off the livestock';
    }
    if (values.other) {
      answer = answer + ' , ' + values.other;
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
        Question_26: answer
      }

    });
    if (answer) {
      browserHistory.push("/q27");
    }

  }
})(AppQ)
