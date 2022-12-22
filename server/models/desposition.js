const mongoose = require("mongoose");
const today = new Date();
const date =
  today.getDate() + "-" + today.getMonth() + "-" + today.getFullYear();
const time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

const Desposition = new mongoose.Schema({
  leadId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  despositionAt: {
    type: String,
    default: time + " " + date,
  },
});

module.exports = mongoose.model("Despositions", Desposition);
