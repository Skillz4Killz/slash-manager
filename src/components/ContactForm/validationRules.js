export default function validate(values) {
  let errors = {};
  if (values.secret && process.env.SECRET_CODE && process.env.SECRET_CODE !== values.secret) {
    errors.secret = "Missing access! The secret code MUST MATCH!";
  }

  if (!values.name) {
    errors.name = "The command name is required!";
  }

  if (!values.description) {
    errors.description = "The description is required!";
  }

  return errors;
}
