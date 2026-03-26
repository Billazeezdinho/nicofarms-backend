import Contact from "../models/contact.js";
import { sendEmail } from "../utils/sendEmail.js";

export const createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

    await sendEmail(req.body);

    res.status(201).json({
      message: "Message sent successfully",
      contact,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
