import bcrypt from "bcryptjs";

export const hashPassword = (Plainpass) => {
  return bcrypt.hashSync(Plainpass);
};
