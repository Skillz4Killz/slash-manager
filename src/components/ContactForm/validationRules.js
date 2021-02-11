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
  } else if (!deconstruct(values.guildID).timestamp) {
    errors.message = "Invalid guild ID provided."
  }
  if (!values.message) {
    errors.message = "Message is required";
  }
  return errors;
}

const epoch = 1420070400000;

function deconstruct(snowflake) {
  if (snowflake === "0") return {
      epoch,
      timestamp: epoch,
      workerID: 0,
      processID: 0,
      increment: 0,
      binary: "0".repeat(64),
      date: new Date(epoch),
      snowflake,
  };

  const binary = toBinary(snowflake).toString(2).padStart(64, "0");
  const res = {
      epoch,
      timestamp: parseInt(binary.substring(0, 42), 2) + epoch,
      workerID: parseInt(binary.substring(42, 47), 2),
      processID: parseInt(binary.substring(47, 52), 2),
      increment: parseInt(binary.substring(52, 64), 2),
      binary: binary,
  };

  return {
      ...res,
      date: new Date(res.timestamp),
      snowflake,
  };
}

function toBinary(num) {
  let bin = "";
  let high = parseInt(num.slice(0, -10)) || 0;
  let low = parseInt(num.slice(-10));
  while (low > 0 || high > 0) {
  bin = String(low & 1) + bin;
  low = Math.floor(low / 2);
      if (high > 0) {
          low += 5000000000 * (high % 2);
          high = Math.floor(high / 2);
      }
  }

  if (!bin) throw new Error("Invalid snowflake");

  return bin;
}