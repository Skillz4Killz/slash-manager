export default function validate(values) {
  let errors = {};
  if (!values.secret || !process.env.SECRET_CODE || process.env.SECRET_CODE !== values.secret) {
    errors.secret = "Missing access! The secret code MUST MATCH!";
  }

  if (!values.name) {
    errors.name = "The command name is required!";
  }

  if (!values.description) {
    errors.description = "The description is required!";
  }

  // if (!values.email) {
  //   errors.email = "Email address is required";
  // } else if (!/\S+@\S+\.\S+/.test(values.email)) {
  //   errors.email = "Email address is invalid";
  // }
  // if (!values.message) {
  //   errors.message = "Message is required";
  // }
  return errors;
}
