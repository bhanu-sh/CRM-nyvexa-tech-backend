import Contact from "../models/contacts.models.js";
import Client from "../models/client.models.js";

/**
 * CREATE contact under a client
 */
export const createContact = async (req, res) => {
  try {
    const { clientId } = req.params;

    const clientExists = await Client.exists({ _id: clientId });
    if (!clientExists)
      return res.status(404).json({ success: false, message: "Client not found" });

    const contact = await Contact.create({
      ...req.body,
      client: clientId
    });

    res.status(201).json({ success: true, data: contact });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * GET contacts BY CLIENT
 */
export const getContactsByClient = async (req, res) => {
  try {
    const { clientId } = req.params;

    const contacts = await Contact.find({ client: clientId })
      .sort({ createdAt: -1 });

    res.json({ success: true, data: contacts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * UPDATE contact
 */
export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!contact)
      return res.status(404).json({ success: false, message: "Contact not found" });

    res.json({ success: true, data: contact });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * DELETE contact
 */
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.contactId);

    if (!contact)
      return res.status(404).json({ success: false, message: "Contact not found" });

    res.json({ success: true, message: "Contact deleted" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

