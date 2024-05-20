import bcrypt from "bcryptjs";

export const hashPassword = (Plainpass) => {
  return bcrypt.hashSync(Plainpass);
};

export const comparePassword = (Plainpass, hashPassword) => {
  return bcrypt.compareSync(Plainpass, hashPassword);
};
