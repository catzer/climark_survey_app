import React from 'react';
import Yup from 'yup';
import {withFormik, Form, Field} from 'formik';
import {browserHistory} from 'react-router';
import {Survey} from './../api/survey';
import {Geolocat} from './../api/geolocation';
import TitleBar from './TitleBar';
import Section from './Section';
import {Tracker} from 'meteor/tracker';
import Footer from './Footer';
// import {SurveyAnswers} from './../api/survey';

export default class QuestionOne extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //survey: [],
      location: {}

    }
  }
  //Built in lifecycle methods
  //component did mount is called when the component is mounted
  componentDidMount() {
    console.log('Component did mount Link List');

    this.surveyTracker = Tracker.autorun(() => {
      Meteor.subscribe('survey');
      // Meteor.subscribe('geolocation');
      const survey = Survey.find().fetch();
       this.setState({survey});
      //  console.log(survey);
       // const geoloc = Geolocat.find().fetch();

      // let location = Geolocation.latLng();
      // console.log(location);
      // if (location) {
      //   this.setState({location: location});
      //   if (geoloc) {
      //     //getting the  _id to update
      //
      //     let id = Geolocat.find({_id}, {
      //       userId: Meteor.userId()
      //     }).fetch()
      //     //updating
      // console.log('there are records in the db');
      //     Geolocat.update({
      //       '_id': id
      //     }, {
      //       $set: {
      //         latitude: location.lat,
      //         longitude: location.lng
      //       }
      //
      //     });
      //   } else {
      //     Geolocat.insert({userId: Meteor.userId(), latitude: location.lat, longitude: location.lng});
      //     console.log('no records in the db');
      //   }
      // }

      // console.log(location);
    })
  }

  //component will unmount is called when the component is unmounted
  componentWillUnmount() {
    console.log('Component will unmount linklist');
    this.surveyTracker.stop();
  }
  render() {
    let location = this.state.location;

    return (<div>
      <TitleBar title='Weather Survey'/>
      <Section section='Section A:DEMOGRAPHICS'/>
      <FormikApp location={location.lat}/>
      <Footer title='By Amfratech Solutions 2018'/> {console.log(location.lat)}
    </div>)
  }
}
const AppQ = (values, handleChange, handleSubmit) => {
  return (<div className='wrapper'>
    <div className='questionList'>
      <p className='questionList__message'>1. What is your Age group?</p>
    </div>

    <Form>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='ageGroup' value='18-25'/>
          18-25 years
        </label>
      </div>

      <div className='question__spacing'>
        <label >
          <Field type='radio' name='ageGroup' value='26-35'/>
          26-35 Years
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='ageGroup' value='36-45'/>
          36-45 Years
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='ageGroup' value='46-55'/>
          46-55 Years
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='ageGroup' value='56-55'/>
          56-65 Years
        </label>
      </div>
      <div className='question__spacing'>
        <label>
          <Field type='radio' name='ageGroup' value='66-75'/>
          66-75 years
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='ageGroup' value='76-85'/>
          76-85 years
        </label>
      </div>
      <div className='question__spacing'>
        <label >
          <Field type='radio' name='ageGroup' value='86+'/>
          86+ Years
        </label>
      </div>

      <div>
        <button className='checkBox'>Submit</button>
      </div>
    </Form>
  </div>);

}
const FormikApp = withFormik({
  mapPropsToValues({location}) {
    return {location: location}
  },

  handleSubmit(values) {

    let date=new Date();
    date = new Date(date).toUTCString();
    date= date.split(' ').slice(0, 4).join(' ');
    console.log(date);
    //rest of the implementation

    if (!!values.ageGroup) {
      browserHistory.push("/q2");
    }

    let surveyDoc = Survey.find({}, {
      sort: {
        number: -1
      },
      limit: 1
    }).fetch();
    let surveyIndex = surveyDoc[0];
    // console.log(surveyIndex);
    if (surveyIndex) {
      Survey.insert({
        Question_One: values.ageGroup,
        number: surveyIndex.number + 1,
        userId: Meteor.userId(),
        user: Meteor.user().emails[0].address,
        date:date
      });
    } else {
      Survey.insert({Question_One: values.ageGroup, number: 1, userId: Meteor.userId(), user: Meteor.user().emails[0].address,date:date});
      // Survey.insert({Question_One: values.ageGroup, number: 1, userId: Meteor.userId(), user: Meteor.user().emails[0].address});
    }
  }
})(AppQ)
