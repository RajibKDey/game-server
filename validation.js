const Joi = require("joi");

const accountValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().max(255).min(6).required().email(),
    password: Joi.string()
      .max(16)
      .min(8)
      .required()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,16})"
        )
      ),
  });
  return schema.validate(data);
};

module.exports.accountValidation = accountValidation;
