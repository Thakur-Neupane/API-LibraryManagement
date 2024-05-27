import Joi from "joi";
const STR = Joi.string();
const STR_REQUIRED = Joi.string().required();
const PHONE = Joi.string.allow("", null);
const EMAIL = Joi.string().email({ minDomainSegments: 2 });

export const newUserValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      fName: STR_REQUIRED,
      lName: STR_REQUIRED,
      phone: PHONE,
      email: EMAIL,
      password: STR_REQUIRED,
    });

    const { error } = schema.validate(req.body);
    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};
export const newBookValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      title: STR_REQUIRED,
      author: STR_REQUIRED,
      thumbnail: STR_REQUIRED,
      isbn: STR_REQUIRED,
      publishedYear: Joi.number(),
      description: STR_REQUIRED,
    });

    const { error } = schema.validate(req.body);
    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};
