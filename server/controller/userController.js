const User = require("../models/user");
const AutoIncrement = require("mongoose-sequence");
const bcrypt = require("bcrypt");
const Role_List = require("../config/Role_LIst");
const createNewUser = async (req, res) => {
  try {
    const { name, email, phone, password, parentId, roles } = req.body;
    const roleId = Role_List[roles];
    console.log(roleId, roles);
    if ((!name, !email, !phone, !password, !roles)) {
      return res.status(400).send("All fields are mandatory !");
    }
    // id Duplicate
    const duplicate = await User.findOne({ name, phone, email });
    if (duplicate) return res.status(409).json({ message: "Duplicate User" });
    const totalUser = await User.find({ roles: "SalesPerson" });
    // console.log(totalUser.length);
    const startNum = 9999 + totalUser.length + 1;
    const nickName = name.slice(0, 4) + startNum;
    // console.log(nickName);
    const hashedPwd = await bcrypt.hash(password, 10);
    if (roleId == 400 || roleId == 1000) {
      const dispositionCount = {
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
        16: 0,
        17: 0,
        18: 0,
        19: 0,
        20: 0,
        21: 0,
      };
      const userCreated = await User.create({
        name,
        userName: nickName,
        email,
        phone,
        password: hashedPwd,
        roles: roleId,
        parentId,
        dispositionCount: dispositionCount,
      });
      res.send(userCreated);
    } else {
      const userCreated = await User.create({
        name,
        userName: nickName,
        email,
        phone,
        password: hashedPwd,
        roles: roleId,
        parentId,
      });
      res.send(userCreated);
    }
  } catch (error) {
    res?.send(error?.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req?.params?.userId;
    console.log(userId);

    const { email, phone, userProfile } = req.body;
    if (userId) {
      const userUpdated = await User.findOneAndUpdate(
        { userId: userId },
        {
          $set: {
            email: email,
            phone: phone,
            userProfile: userProfile,
          },
        }
      );
      res.send("Successfully Updated");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getAllUser = async (req, res) => {
  try {
    const parentId = req?.params?.parentId;
    const userFind = await User.find({ parentId: parentId });
    res.send(userFind);
  } catch (error) {
    console.log(error.message);
  }
};
const getAllUserName = async (req, res) => {
  try {
    const parentId = req?.params?.parentId;
    const userFind = await User.find({ parentId: parentId });
    const getNames = await userFind.map(({ name }) => name);
    // const {user} = userFind;
    // console.log(user.name)
    const names = Object.assign({}, getNames);
    res.send(names);
  } catch (error) {
    console.log(error.message);
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req?.params?.userId;
    const getUser = await User.find({ userId: userId });
    res.send(getUser);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userID = req?.params?.userID;
    res.send(userID);
    const userDelete = await User.find({ userID: userID });
    res.send(userDelete);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createNewUser,
  updateUser,
  getAllUser,
  deleteUser,
  getAllUserName,
};
