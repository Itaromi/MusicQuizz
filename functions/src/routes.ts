import express from "express";
import { getAppointments } from "./odooController";

const router = express.Router();

// Route pour récupérer les rendez-vous Odoo via GET
router.get("/odoo/appointments", getAppointments);

export default router;