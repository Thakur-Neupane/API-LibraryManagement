import UserSchema from "./user/UserSchema.js";

const createNewUser = (userObj) => {
  return UserSchema(userObj).bulkSave();
};
export default createNewUser;
