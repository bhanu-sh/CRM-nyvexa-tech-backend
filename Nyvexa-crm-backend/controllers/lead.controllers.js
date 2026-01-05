import Lead from "../models/lead.models.js";

/**
 * CREATE Lead
 */
export const createLead = async (req, res) => {
  try {
    const lead = await Lead.create({
      ...req.body,
      createdBy: req.user._id,
      leadOwner: req.user.company
    });

    res.status(201).json(lead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * GET all Leads (optionally by clientID)
 * /leads?clientID=xxxx
 */
export const getLeads = async (req, res) => {
  try {
    const filter = {};

    if (req.query.clientID) {
      filter.clientID = req.query.clientID;
    }

    const leads = await Lead.find(filter)
      .populate("clientID", "companyName")
      .populate("leadOwner", "name email")
      .sort({ createdAt: -1 });

    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET single Lead by ID
 */
export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate("clientID")
      .populate("leadOwner");

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * UPDATE Lead
 */
export const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(lead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * DELETE Lead
 */
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json({ message: "Lead deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
