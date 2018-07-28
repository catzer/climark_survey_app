import React from 'react';
import Yup from 'yup';
import {withFormik, Form, Field} from 'formik';
import {browserHistory} from 'react-router';
import TitleBar from './TitleBar';
import Section from './Section';
import {Survey} from './../api/survey';

export default class QuestionThree extends React.Component{
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
  render(){
    return(

      <div>
        <TitleBar title='Weather Survey'/>
        <Section section='Section A:DEMOGRAPHICS'/>
        <FormikApp/>
      </div>

    )
  }
}
const AppQ=(values,handleChange, handleSubmit)=>{
  return(
    <div className='wrapper'>
      <div className='questionList'>
        <p className='questionList__message'>3.What is your county?</p>
      </div>

      <Form>
        <div className='question__spacing'>
          <label >
            <Field type='radio' name='county' value='Marsabit'/> Marsabit
          </label>
        </div>

        <div className='question__spacing'>
          <label >
            <Field type='radio' name='county' value='Isiolo'/> Isiolo
          </label>
        </div>
        <div>
          <button className='checkBox'>Submit</button>
        </div>
      </Form>
    </div>
  );

}
const FormikApp=withFormik({
  mapPropsToValues({email, password, ageGroup}){
    return{
      email:email || '',
      password:password || '',
      ageGroup: ageGroup||''
    }
  },

  handleSubmit(values){
    console.log('Selected county is:' + values.county);
    if (values.county==='Marsabit') {
      browserHistory.push("/q4");
      let surveyDoc=Survey.find({},
        {sort:{number:-1},
        limit:1}
      ).fetch();
      let surveyIndex=surveyDoc[0]._id;
      console.log(surveyIndex);
      Survey.update(
        {'_id':surveyIndex},
        {$set:{
          Question_three:values.county
        }

      }
    );

  } else if (values.county==='Isiolo'){
    browserHistory.push("/q5");
    let surveyDoc=Survey.find({},
      {sort:{number:-1},
      limit:1}
    ).fetch();
    let surveyIndex=surveyDoc[0]._id;
    console.log(surveyIndex);
    Survey.update(
      {'_id':surveyIndex},
      {$set:{
        Question_three:values.county
      }

    }
  );

}

},

})(AppQ)
