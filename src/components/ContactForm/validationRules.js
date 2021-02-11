export default function validate(values) {
  let errors = {};
  if (!values.name) {
    errors.name = "Name is required";
  }
  if (!values.email) {
    errors.email = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  } else if (values.secret !== process.env.SECRET_CODE) {
    errors.message = "Secret key is not same as the SECRET_CODE provided as an environment variables."
  } else if (/^\d+$/.test(values.secret)) {
    errors.message = "Invalid guild ID provided."
  }
  if (!values.message) {
    errors.message = "Message is required";
  }
  return errors;
}
