import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDom from 'react-dom';
import App from './../imports/ui/App';
import {Survey} from './../imports/api/survey';


Meteor.startup(() => {
  // code to run on server at startup
  //<Geolocation/>
  process.env.MAIL_URL = "smtps://jnziokah%40gmail.com:05.Nzioka.08@smtp.gmail.com:465/";
  let title ='Climate Survey';
  let surveyDoc = Survey.find({}, {
    sort: {
      number: -1
    },
    limit: 1
  }).fetch();
});
