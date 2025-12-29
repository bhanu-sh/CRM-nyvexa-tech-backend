import express from "express";
import {
  createContact,
  getContactsByClient,
  updateContact,
  deleteContact
} from "../controllers/contacts.controllers.js";

const router = express.Router();

// Contacts are ALWAYS under a client
router.post("/client/:clientId", createContact);
router.get("/client/:clientId", getContactsByClient);

router.put("/:contactId", updateContact);
router.delete("/:contactId", deleteContact);

export default router;
