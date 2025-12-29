import Lead from "../models/lead.models.js"
import Contact from "../models/contacts.models.js"

/**
 * Helper: find contact by PAN
 */
const findContactByPAN = (panNo) => {
  return Contact.findOne({ panNo });
};

/**
 * Mark Lead as DONE
 */
export const markLeadDone = async (req, res) => {
  try {
    const { leadId } = req.params;
    const { panNo, name, designation, email, phone, whatsapp, notes } = req.body;

    const lead = await Lead.findById(leadId);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    lead.status = "Done";
    await lead.save();

    let contact = await findContactByPAN(panNo);

    if (!contact) {
      contact = await Contact.create({
        client: lead.clientID,
        name,
        panNo,
        designation,
        email,
        phone,
        whatsapp,
        notes,
        createdBy: lead.leadOwner
      });
    }

    res.json({ lead, contact });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Mark Lead as POSTPONE
 */
export const markLeadPostpone = async (req, res) => {
  try {
    const { leadId } = req.params;
    const { panNo, name, designation, email, phone, whatsapp, notes } = req.body;

    const lead = await Lead.findById(leadId);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    lead.status = "Postpone";
    await lead.save();

    let contact = await findContactByPAN(panNo);

    if (!contact) {
      contact = await Contact.create({
        client: lead.clientID,
        name,
        panNo,
        designation,
        email,
        phone,
        whatsapp,
        notes,
        createdBy: lead.leadOwner
      });
    }

    res.json({ lead, contact });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Mark Lead as CANCEL
 */
export const markLeadCancel = async (req, res) => {
  try {
    const { leadId } = req.params;
    const { panNo } = req.body;

    const lead = await Lead.findById(leadId);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    lead.status = "Cancel";
    await lead.save();

    const contact = await findContactByPAN(panNo);

    if (contact) {
      contact.isActive = false;
      await contact.save();
    }

    res.json({ lead, contact });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};