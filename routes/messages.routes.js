const router = require("express").Router();
const nodemailer = require("nodemailer");

router.post("/send-mail", async (req, res) => {
  const { name, email, phone, offer, msg } = req.body;

  const transport = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
  const message = {
    from: "noreplay@auto-premium.pt",
    to: "offers@auto-premium.pt",
    subject: `Your vehicle has received an offer! Auto-Premium`,
    text: `
    Name: ${name},
    Email: ${email},
    Phone: ${phone},
    Offer: ${offer.toLocaleString("pt-pt", {
      minimumFractionDigits: 2,
    })} €.

    ${msg}`,
    html: `
    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Phone:</b> ${phone}</p>
    <p><b>Offer:</b> ${offer.toLocaleString("pt-pt", {
      minimumFractionDigits: 2,
    })} €.</p>

    ${msg}`,
  };

  transport.sendMail(message, (err) => {
    if (err) {
      return res.status(404).json({
        erro: true,
        message: "Failed to send the email!",
      });
    } else {
      res.status(200).json({ message: "Offer sent!" });
    }
  });
});

module.exports = router;
