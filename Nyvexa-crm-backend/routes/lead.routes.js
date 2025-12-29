import express from "express"
import {
    createLead,
    getLeads,
    getLeadById, 
    updateLead, 
    deleteLead
} from "../controllers/lead.controllers.js"

const router = express.Router()

router.post("/", createLead);              // Create lead
router.get("/", getLeads);                 // Get all / by clientID
router.get("/:id", getLeadById);           // Get single
router.put("/:id", updateLead);            // Update
router.delete("/:id", deleteLead); 

export default router