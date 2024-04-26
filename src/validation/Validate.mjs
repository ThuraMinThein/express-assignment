export const userValidateBodyData = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      defineError(error, res);
    }
  };
};

export const validateParamData = (schema) => {
  return (req, res, next) => {
    try {
      const id = +req.params.id;
      schema.parse({ id });
      next();
    } catch (error) {
      defineError(error, res);
    }
  };
};

const defineError = (error, res) => {
  if ((error, res)) {
    const errorMessages = error.errors.map((issue) => ({
      message: `${issue.path.join(".")} is ${issue.message}`,
    }));
    res.status(400).json({ error: "Invalid data", details: errorMessages });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
