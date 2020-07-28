const { twilloConfig } = require("../config");
const twilloCustom = {
  /**
   * @async function
   * twillo send message common function
   */

  smsTwillo: async (phoneNumber, otp) => {
    console.log("ssssssssssss");
    const accountSid = twilloConfig.TWILLO_SID;
    const authToken = twilloConfig.TWILLO_TOKEN;
    const client = require("twilio")(accountSid, authToken);
    console.log("tttttttttttt");
    const objTwillo = {
      from: twilloConfig.TWILLO_NUMBER,
      body: "Your Charmr code is: " + otp,
      to: phoneNumber
    };
    const data = await client.messages.create(objTwillo);
    console.log("datatata ", data);
    return data;
  }
};

module.exports = twilloCustom;
