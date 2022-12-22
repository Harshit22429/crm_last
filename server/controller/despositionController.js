const Desposition = require("../models/desposition");
const Customer = require("../models/cutomer");
const User = require("../models/user");
const addDespositon = async (req, res) => {
  try {
    const leadId = req.params.lead_id;
    // const despositionAdd = await Desposition.create({
    //   userId,
    //   desposition,
    //   comment,
    //   lead_id: leadId,
    // });
    // const countOfDisposition = await Desposition.find({ lead_id: leadId });
    // const totalDisposition = countOfDisposition.length;
    // console.log(totalDisposition);
    // const customerCountUpdate = await Customer.updateOne(
    //   { lead_id: leadId },
    //   { dispositionCount: totalDisposition }
    // );
    // console.log(customerCountUpdate);
    const { userAgent, despositionType, comment } = req.body;
    const leadFind = await Customer.findOne({ _id: leadId });
    const user = await User.findOne({ name: userAgent });
    const dispositionCount = await user.dispositionCount;
    console.log(user);
    dispositionCount[despositionType] = dispositionCount[despositionType] + 1;
    console.log(user);
    const userCountUpdate = await User.updateOne(
      { _id: user._id },
      { dispositionCount: dispositionCount }
    );
    const despositionAdd = await Desposition.create({
      comment,
      leadId: leadFind._id,
    });
    res.json({ despositionAdd, userCountUpdate });
    res.send({ userCountUpdate, userId });
  } catch (error) {
    console.log(error.message);
  }
};

const getAllDesposition = async (req, res) => {
  try {
    const custId = req.params.lead_id;
    const getDespositin = await Desposition.find({ lead_id: custId });
    res.send(getDespositin);
  } catch (error) {
    console.log(error.message);
  }
};

// const deleteDesposition = async(req,res)=>{
//     try{

//     }catch(error){

//     }
// }
module.exports = {
  addDespositon,
  getAllDesposition,
};
