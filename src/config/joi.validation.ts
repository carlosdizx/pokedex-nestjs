import * as Joi from "joi";

const JoiValidation = Joi.object({
  DB_HOST: Joi.required(),
  PORT: Joi.number().default(3000),
  DEFAULT_LIMIT: Joi.number().default(8),
});

export default JoiValidation;
