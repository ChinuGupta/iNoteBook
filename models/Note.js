const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
  user:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'User'
  },

  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true
  },
  tag: {
    type:String,
    default: "General",
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("notes", NotesSchema);
