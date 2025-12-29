import express from "express";
import {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient
} from "../controllers/client.controllers.js";

const router = express.Router();

router.post("/", createClient);
router.get("/", getClients);
router.get("/:clientId", getClientById);
router.put("/:clientId", updateClient);
router.delete("/:clientId", deleteClient);

export default router;
