import axios from "axios";

axios.defaults.headers.common["Authorization"] = process.env.BOT_TOKEN;

exports.handler = async function (event, context) {
  try {
    console.log("Form ran", process.env, event);
    const body = JSON.parse(event.body);
    if (!body)
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid Body!" }),
      };

    if (!body.secret || !process.env.SECRET_CODE || body.secret !== process.secret.env.SECRET_CODE) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Who are you? Wrong code provided!" }),
      };
    }

    const GUILD_SLASH = `https://discord.com/api/v8/applications/${process.env.APPLICATION_ID}/guilds/${body.guildID}/commands`;
    const GLOBAL_SLASH = `https://discord.com/api/v8/applications/${process.env.APPLICATION_ID}/commands`;
    const url = guild ? GUILD_SLASH : GLOBAL_SLASH;

    if (method) {
      await axios.post(url, {
        ...values,
        options,
      });
    } else {
      await axios.delete(url, {
        ...values,
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Success" }),
    };
  } catch (error) {
    console.log("Error:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Something unknown happened." }),
    };
  }
};
