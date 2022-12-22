const User = require("../models/user");
const getCompleteReport = async (req, res) => {
  try {
    const parentId = parseInt(req.params.parentId);
    const users = await User.aggregate([
      {
        $match: {
          $or: [{ parentId: parentId }, { userId: parentId }],
        },
      },
    ]);

    const leadData = [];
    users.map((user) => {
      leadData.push({ name: user.name, count: user.dispositionCount });
    });

    res.send(leadData);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getCompleteReport };
