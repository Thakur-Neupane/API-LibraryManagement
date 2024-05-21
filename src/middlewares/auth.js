import { findToken } from "../models/session/SessionSchema.js";
import { getUserByEmail } from "../models/user/UserModel.js";
import { verifyAccessJWT } from "../utils/jwt.js";

export const auth = async (req, res, next) => {
  try {
    //1 receive jwt via authorization header
    const { authorization } = req.headers;

    // 2Verify if jwt is valid (no expired, sectetkey) by decoding jwt
    const decoded = verifyAccessJWT(authorization);

    if (decoded?.email) {
      // 3 check if the token exist in the db session table
      const tokenObj = await findToken(authorization);

      if (tokenObj?._id) {
        // 4 extract email from the decoded jwt object
        // 5 get user by email
        const user = await getUserByEmail(decoded.email);
        if (user?._id) {
          // if user exist, they are now authorized
          user.password = undefined;
          req.userInfo = user;
          return next();
        }
      }
    }

    const error = {
      message: "Unauthorized",
      status: 403,
    };
    next(error);
  } catch (error) {
    next(error);
  }
};
