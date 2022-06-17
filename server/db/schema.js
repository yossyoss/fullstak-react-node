const Joi = require("joi")

const schema = Joi.object({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string(),
  emailId: Joi.string(),
})

module.exports = schema
