import Client from "../models/client.models.js";

/**
 * CREATE client
 */
export const createClient = async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json({ success: true, data: client });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * GET all clients
 */
export const getClients = async (req, res) => {
  try {
    const clients = await Client.find({ isActive: true })
      .sort({ createdAt: -1 });

    res.json({ success: true, data: clients });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET client by ID
 */
export const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.clientId);

    if (!client)
      return res.status(404).json({ success: false, message: "Client not found" });

    res.json({ success: true, data: client });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * UPDATE client
 */
export const updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.clientId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!client)
      return res.status(404).json({ success: false, message: "Client not found" });

    res.json({ success: true, data: client });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * SOFT DELETE client
 */
export const deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.clientId,
      { isActive: false },
      { new: true }
    );

    if (!client)
      return res.status(404).json({ success: false, message: "Client not found" });

    res.json({ success: true, message: "Client deactivated" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/*
Build To, Shipped To
Multiple contacts over multiple products
Lead No.
*/
