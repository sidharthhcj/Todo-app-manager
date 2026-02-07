import validator from "validator";
const validate = async (req, res, next) => {
  let { name, email, password } = req.body;
  if (!validator.isEmail(email)) {
    throw new Error("Enter a valid email");
  }
  if (validator.isEmpty(name) || name.length > 20 || name.length < 2) {
    throw new Error("Enter a valid name");
  }
};

export { validate };
