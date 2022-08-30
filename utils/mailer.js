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

const notifyNewUser = async (data) => {
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

const notifyOrder = async (data) => {
const { id, user, productos, total } = data;
console.log(user)
  try {
    const status = await transporter.sendMail({
      from: "CHBE Admin <admin@coder.com>",
      to: adminEmail,
      subject: `Nueva orden de ${user.name}`,
      html: generateOrderMail(id,user, productos, total),
    });
    logger.info(status)
  } catch (error) {
    logger.error(`Mailer error: ${error}`)
  }
};

module.exports = { notifyNewUser, notifyOrder };
