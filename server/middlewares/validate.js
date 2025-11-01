export const validateBody = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) {
    const err = new Error('Validation error');
    err.statusCode = 400;
    err.errors = error.details.map(d => ({ message: d.message, path: d.path }));
    return next(err);
  }
  req.body = value;
  next();
};
