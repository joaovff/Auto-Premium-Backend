const router = require("express").Router();
const { Vonage } = require("@vonage/server-sdk");

router.get("/send-sms", (req, res) => {
  const { from, to, text } = req.body;
  const vonage = new Vonage({
    apiKey: process.env.VONAGE_KEY,
    apiSecret: process.env.VONAGE_SECRET,
  });

  async function sendSMS() {
    try {
      const resp = await vonage.sms.send({ to, from, text });
      console.log("Message sent successfully");
      console.log(resp);
    } catch (err) {
      console.log("There was an error sending the message.");
      console.error(err);
    }
  }

  sendSMS();
});

module.exports = router;
