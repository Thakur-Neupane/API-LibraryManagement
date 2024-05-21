import { findToken } from "../models/session/SessionSchema";
import { verifyAccessJWT } from "../utils/jwt";
import { getUserByEmail } from "../models/user/UserModel";

export const auth = async (req, res, next) => {
  try {
    // Receive jwt via authorization header
    const { authorization } = req.headers;

    const decoded = verifyAccessJWT(authorization);

    if (decoded?.email) {
      const tokenObj = await findToken(authorization);

      if (tokenObj?._id) {
        const user = await getUserByEmail(decoded.email);
        if (user?._id) {
          console.log(user);
          req.password = undefined;

          req.userInfo = user;
          return next();
        }
      }

      const error = {
        message: "Unauthorized",
        status: 403,
      };
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
