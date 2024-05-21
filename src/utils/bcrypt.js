import bcrypt from "bcryptjs";
const saltRound = 15;
export const hashPassword = (Plainpass) => {
  return bcrypt.hashSync(Plainpass, saltRound);
};

export const comparePassword = (Plainpass, hashPassword) => {
  return bcrypt.compareSync(Plainpass, hashPassword);
};
