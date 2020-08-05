const mongoose = require('mongoose');

const titleSchema=new mongoose.Schema({
 title:{
  type:String,
  required:true
 }
})
var title = mongoose.model("title", titleSchema);
module.exports = {title}