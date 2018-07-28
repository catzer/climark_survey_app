import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
export const Geolocat=new Mongo.Collection('geolocation');

if(Meteor.isServer){
  Meteor.publish('geolocation',()=>{
    return Geolocat.find({userId:Meteor.userId()});
  });
}
