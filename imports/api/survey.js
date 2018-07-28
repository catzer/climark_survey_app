import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
export const Survey=new Mongo.Collection('survey');

if(Meteor.isServer){
  Meteor.publish('survey',()=>{
    return Survey.find({userId:Meteor.userId()});
  });
}
