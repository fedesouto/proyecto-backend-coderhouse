const { createTransport } = require("nodemailer");
const { gmail_pass, gmail_user } = require("../config");
const logger = require("./logger");
const generateOrderMail = require("./templates/orderMail");

const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: gmail_user,
    pass: gmail_pass,
  },
});

const adminEmail = "federicogsouto@gmail.com";

const mailNewUser = async (data) => {
  try {
    const status = await transporter.sendMail({
      from: "CHBE Admin <admin@coder.com>",
      to: adminEmail,
      subject: "Nuevo registro",
      html: `
            <h1>Nuevo usuario registrado</h1>
            <ul>
            <li>Id: ${data.id}</li>
            <li>Username: ${data.username}</li>
            <li>Name: ${data.name}</li>
            <li>Address: ${data.address}</li>
            <li>Age: ${data.age}</li>
            <li>Phone: ${data.phone}</li>
            </ul>
            `,
    });
    logger.info(status)
  } catch (error) {
    logger.error(`Mailer error: ${error}`)
  }
};

const mailNewOrder = async (id, user, products, total) => {
  try {
    console.log(products)
    const status = await transporter.sendMail({
      from: "CHBE Admin <admin@coder.com>",
      to: adminEmail,
      subject: `Nueva orden de ${user.name}`,
      html: generateOrderMail(id, user, products, total),
    });
    logger.info(status)
  } catch (error) {
    logger.error(`Mailer error: ${error}`)
  }
};

module.exports = { mailNewUser, mailNewOrder };
