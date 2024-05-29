const router = require("express").Router();
const { Vonage } = require("@vonage/server-sdk");

router.post("/send-sms", (req, res) => {
  const { to, text } = req.body;
  const vonage = new Vonage({
    apiKey: process.env.VONAGE_KEY,
    apiSecret: process.env.VONAGE_SECRET,
  });

  async function sendSMS() {
    try {
      await vonage.sms.send({
        from: process.env.VONAGE_NUMBER,
        to,
        text,
      });
      res.status(200).json("Message sent successfully");
    } catch (e) {
      res.status(500).json(`Error sending message: ${e}`);
    }
  }

  sendSMS();
});

module.exports = router;
