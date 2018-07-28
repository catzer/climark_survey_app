import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './../imports/ui/App';
import {Router, Route, browserHistory} from 'react-router';
import {Tracker} from 'meteor/tracker';
import {Survey} from './../imports/api/survey';
import {Geolocation} from './../imports/api/geolocation';
import ForgotPassword from './../imports/ui/ForgotPassword';
import ChangePassword from './../imports/ui/ChangePassword';
import Login from './../imports/ui/Login';
import SignUp from './../imports/ui/SignUp';
import QuestionOne from './../imports/ui/QuestionOne';
import QuestionTwo from './../imports/ui/QuestionTwo';
import QuestionThree from './../imports/ui/QuestionThree';
import QuestionFour from './../imports/ui/QuestionFour';
import QuestionFive from './../imports/ui/QuestionFive';
import QuestionSix from './../imports/ui/QuestionSix';
import QuestionSeven from './../imports/ui/QuestionSeven';
import QuestionEight from './../imports/ui/QuestionEight';
import QuestionNine from './../imports/ui/QuestionNine';
import QuestionTen from './../imports/ui/QuestionTen';
import QuestionEleven from './../imports/ui/QuestionEleven';
import QuestionTwelve from './../imports/ui/QuestionTwelve';
import QuestionThirteen from './../imports/ui/QuestionThirteen';
import QuestionFourteen from './../imports/ui/QuestionFourteen';
import QuestionFifteen from './../imports/ui/QuestionFifteen';
import QuestionSixteen from './../imports/ui/QuestionSixteen';
import QuestionSeventeen from './../imports/ui/QuestionSeventeen';
import QuestionEighteen from './../imports/ui/QuestionEighteen';
import QuestionNineteen from './../imports/ui/QuestionNineteen';
import QuestionTwenty from './../imports/ui/QuestionTwenty';
import QuestionTwentyOne from './../imports/ui/QuestionTwentyOne';
import QuestionTwentyTwo from './../imports/ui/QuestionTwentyTwo';
import QuestionTwentyThree from './../imports/ui/QuestionTwentyThree';
import QuestionTwentyFour from './../imports/ui/QuestionTwentyFour';
import QuestionTwentyFive from './../imports/ui/QuestionTwentyFive';
import QuestionTwentySix from './../imports/ui/QuestionTwentySix';
import QuestionTwentySeven from './../imports/ui/QuestionTwentySeven';
import QuestionTwentyEight from './../imports/ui/QuestionTwentyEight';
import QuestionTwentyNine from './../imports/ui/QuestionTwentyNine';
import QuestionThirty from './../imports/ui/QuestionThirty';
import QuestionThirtyOne from './../imports/ui/QuestionThirtyOne';
import QuestionThirtyTwo from './../imports/ui/QuestionThirtyTwo';
import QuestionThirtyThree from './../imports/ui/QuestionThirtyThree';
import QuestionThirtyFour from './../imports/ui/QuestionThirtyFour';
import QuestionThirtyFive from './../imports/ui/QuestionThirtyFive';
import QuestionThirtySix from './../imports/ui/QuestionThirtySix';
import QuestionThirtySeven from './../imports/ui/QuestionThirtySeven';
import QuestionThirtyEight from './../imports/ui/QuestionThirtyEight';
import QuestionThirtyNine from './../imports/ui/QuestionThirtyNine';
import QuestionFourty from './../imports/ui/QuestionFourty';
import QuestionFourtyOne from './../imports/ui/QuestionFourtyOne';
import QuestionFourtyTwo from './../imports/ui/QuestionFourtyTwo';
import QuestionFourtyThree from './../imports/ui/QuestionFourtyThree';

//array to track authenticated routes
const unauthenticatedPages = ['/', '/signup', '/forgotpassword'];
const authenticatedPages = [
  '/changepassword',
  '/q1',
  '/q2',
  '/q3',
  '/q4',
  '/q4',
  '/q6',
  '/q7',
  '/q8',
  '/q9',
  '/q10',
  '/q11',
  '/q12',
  '/q13',
  '/q14',
  '/q15',
  '/q16',
  '/q17',
  '/q18',
  '/q19',
  '/q20',
  '/q21',
  '/q22',
  '/q23',
  '/q24',
  '/q25',
  '/26',
  '/q27',
  '/q28',
  '/q29',
  '/q30',
  '/q31',
  '/q32',
  '/q33',
  '/q34',
  '/q35',
  '/q36',
  '/q37',
  '/q38',
  '/q39',
  '/40',
  '/q41',
  '/q42',
  '/q43'
];
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.push('/q1');
  }
};

const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.push('/');
  }
};

const routes = (<Router history={browserHistory}>
  <Route path='/forgotpassword' component={ForgotPassword} onEnter={onEnterPublicPage}/>
  <Route path='/changepassword' component={ChangePassword} onEnter={onEnterPrivatePage}/>
  <Route path='/' component={Login} onEnter={onEnterPublicPage}/>
  <Route path='/signup' component={SignUp} onEnter={onEnterPublicPage}/>
  <Route path='/app' component={App} onEnter={onEnterPrivatePage}/>
  <Route path='/q1' component={QuestionOne} onEnter={onEnterPrivatePage} id={'100'}/>
  <Route path='/q2' component={QuestionTwo} onEnter={onEnterPrivatePage}/>
  <Route path='/q3' component={QuestionThree} onEnter={onEnterPrivatePage}/>
  <Route path='/q4' component={QuestionFour} onEnter={onEnterPrivatePage}/>
  <Route path='/q5' component={QuestionFive} onEnter={onEnterPrivatePage}/>
  <Route path='/q6' component={QuestionSix} onEnter={onEnterPrivatePage}/>
  <Route path='/q7' component={QuestionSeven} onEnter={onEnterPrivatePage}/>
  <Route path='/q8' component={QuestionEight} onEnter={onEnterPrivatePage}/>
  <Route path='/q9' component={QuestionNine} onEnter={onEnterPrivatePage}/>
  <Route path='/q10' component={QuestionTen} onEnter={onEnterPrivatePage}/>
  <Route path='/q11' component={QuestionEleven} onEnter={onEnterPrivatePage}/>
  <Route path='/q12' component={QuestionTwelve} onEnter={onEnterPrivatePage}/>
  <Route path='/q13' component={QuestionThirteen} onEnter={onEnterPrivatePage}/>
  <Route path='/q14' component={QuestionFourteen} onEnter={onEnterPrivatePage}/>
  <Route path='/q15' component={QuestionFifteen} onEnter={onEnterPrivatePage}/>
  <Route path='/q16' component={QuestionSixteen} onEnter={onEnterPrivatePage}/>
  <Route path='/q17' component={QuestionSeventeen} onEnter={onEnterPrivatePage}/>
  <Route path='/q18' component={QuestionEighteen} onEnter={onEnterPrivatePage}/>
  <Route path='/q19' component={QuestionNineteen} onEnter={onEnterPrivatePage}/>
  <Route path='/q20' component={QuestionTwenty} onEnter={onEnterPrivatePage}/>
  <Route path='/q21' component={QuestionTwentyOne} onEnter={onEnterPrivatePage}/>
  <Route path='/q22' component={QuestionTwentyTwo} onEnter={onEnterPrivatePage}/>
  <Route path='/q23' component={QuestionTwentyThree} onEnter={onEnterPrivatePage}/>
  <Route path='/q24' component={QuestionTwentyFour} onEnter={onEnterPrivatePage}/>
  <Route path='/q25' component={QuestionTwentyFive} onEnter={onEnterPrivatePage}/>
  <Route path='/q26' component={QuestionTwentySix} onEnter={onEnterPrivatePage}/>
  <Route path='/q27' component={QuestionTwentySeven} onEnter={onEnterPrivatePage}/>
  <Route path='/q28' component={QuestionTwentyEight} onEnter={onEnterPrivatePage}/>
  <Route path='/q29' component={QuestionTwentyNine} onEnter={onEnterPrivatePage}/>
  <Route path='/q30' component={QuestionThirty} onEnter={onEnterPrivatePage}/>
  <Route path='/q31' component={QuestionThirtyOne} onEnter={onEnterPrivatePage}/>
  <Route path='/q32' component={QuestionThirtyTwo} onEnter={onEnterPrivatePage}/>
  <Route path='/q33' component={QuestionThirtyThree} onEnter={onEnterPrivatePage}/>
  <Route path='/q34' component={QuestionThirtyFour} onEnter={onEnterPrivatePage}/>
  <Route path='/q35' component={QuestionThirtyFive} onEnter={onEnterPrivatePage}/>
  <Route path='/q36' component={QuestionThirtySix} onEnter={onEnterPrivatePage}/>
  <Route path='/q37' component={QuestionThirtySeven} onEnter={onEnterPrivatePage}/>
  <Route path='/q38' component={QuestionThirtyEight} onEnter={onEnterPrivatePage}/>
  <Route path='/q39' component={QuestionThirtyNine} onEnter={onEnterPrivatePage}/>
  <Route path='/q40' component={QuestionFourty} onEnter={onEnterPrivatePage}/>
  <Route path='/q41' component={QuestionFourtyOne} onEnter={onEnterPrivatePage}/>
  <Route path='/q42' component={QuestionFourtyTwo} onEnter={onEnterPrivatePage}/>
  <Route path='/q43' component={QuestionFourtyThree} onEnter={onEnterPrivatePage}/>

</Router>);
setTimeout(() => {
  let surveyDoc = Survey.find({}, {
    sort: {
      number: -1
    },
    limit: 1
  }).fetch();
  surveyIndex = surveyDoc[0];
  console.log(surveyIndex);
}, 1000);

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);
  console.log('isAuthenticated:' + isAuthenticatedPage);

  // Survey.update({
  //   '_id': surveyIndex
  // }, {
  //   $set: {
  //     Question_37: values.q_37_answer
  //   }
  // });

  if (isAuthenticated && isUnauthenticatedPage) {
    browserHistory.push('/q1');
  } else if (!isAuthenticated && isAuthenticatedPage) {
    browserHistory.push('/')
  }
});

Meteor.startup(() => {
  // code to run on server at startup

  ReactDOM.render(routes, document.getElementById('app'));

});
