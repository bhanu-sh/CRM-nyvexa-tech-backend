import express from "express";
import {
  markLeadDone,
  markLeadPostpone,
  markLeadCancel
} from "../controllers/leadManagement.controllers.js";

const router = express.Router();

router.patch("/:leadId/done", markLeadDone);
router.patch("/:leadId/postpone", markLeadPostpone);
router.patch("/:leadId/cancel", markLeadCancel);

export default router;