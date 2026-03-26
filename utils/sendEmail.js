import { transporter } from "../config/mail.js";

export const sendEmail = async (data) => {
  await transporter.sendMail({
    from: `"Nico Farms" <${process.env.EMAIL_USER}>`,
    to: "nicofarms@email.com",
    subject: "New Contact Message",
    text: `
      Name: ${data.name}
      Email: ${data.email}
      Message: ${data.message}
      Type: ${data.type}
    `,
  });
};
