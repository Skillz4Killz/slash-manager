import { useState, useEffect } from "react";
import { notification } from "antd";
import axios from "axios";

const useForm = (validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [options, setOption] = useState([]);
  const [guildID, setGuildID] = useState("");
  const [method, setMethod] = useState(true);
  const [guild, setGuild] = useState(true);
  const [shouldSubmit, setShouldSubmit] = useState(false);

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Success",
      description: "Your message has been sent!",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));

    axios
      .post(`https://slashmanager.netlify.app/.netlify/functions/form`, {
        ...values,
        options,
        method,
      })
      .then(() => {
        setShouldSubmit(true);
      });
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && shouldSubmit) {
      setValues("");
      openNotificationWithIcon("success");
    }
  }, [errors, shouldSubmit]);

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    setErrors((errors) => ({ ...errors, [event.target.name]: "" }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    options,
    setOption,
    guildID,
    setGuildID,
    method,
    setMethod,
    guild,
    setGuild,
  };
};

export default useForm;
