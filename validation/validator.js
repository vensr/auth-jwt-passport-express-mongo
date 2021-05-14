const validator = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = []
      details.map(i => message.push(i.message));
      res.status(422).json({ errors: message })
    }
  }
}
module.exports = validator;
