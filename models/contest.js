const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
  firstName:{
type:String
 } ,lastName:{
  type:String
 },age:{
type:String
 },
 email:{
  type:String
 },
 phone:{
  type:String
 },
 title:{
  type: mongoose.Schema.Types.ObjectId,
  ref:'title'
 }
});

const contest = mongoose.model('contest',contestSchema);

module.exports = {contest}