import bcrypt from "bcryptjs";

export const hasPassword = (Plainpass) => {
  return bcrypt.hashSync(Plainpass);
};
